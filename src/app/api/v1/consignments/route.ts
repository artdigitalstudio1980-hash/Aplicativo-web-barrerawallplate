import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { createConsignmentSchema } from '@/lib/validators/consignment';
import { logAudit, getClientInfo } from '@/lib/audit';
import { format } from 'date-fns';

// GET /api/v1/consignments
export const GET = withAuth(async (req, { user }) => {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    const where = {
      ...(status ? { status: status as any } : {}),
      ...(user.role === 'VENDEDOR' ? { userId: user.userId } : {}),
    };

    const [consignments, total] = await Promise.all([
      prisma.consignment.findMany({
        where,
        include: {
          client: { select: { contactName: true, companyName: true } },
          user: { select: { firstName: true, lastName: true } },
          items: { include: { variant: { include: { product: { select: { name: true } } } } } },
          _count: { select: { items: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.consignment.count({ where }),
    ]);

    return NextResponse.json({
      data: consignments,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('List consignments error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);

// POST /api/v1/consignments
export const POST = withAuth(async (req, { user }) => {
  try {
    const body = await req.json();
    const parsed = createConsignmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { clientId, warehouseId, shipDate, dueDate, notes, items } = parsed.data;

    const today = format(new Date(), 'yyyyMMdd');
    const count = await prisma.consignment.count({
      where: { consignmentNumber: { startsWith: `BWP-CON-${today}` } },
    });
    const consignmentNumber = `BWP-CON-${today}-${String(count + 1).padStart(4, '0')}`;

    const consignment = await prisma.$transaction(async (tx) => {
      // Verify stock
      for (const item of items) {
        const variant = await tx.productVariant.findUnique({ where: { id: item.variantId } });
        if (!variant) throw new Error(`Variant ${item.variantId} not found`);
        if (variant.stockQuantity < item.quantitySent) {
          throw new Error(`Insufficient stock for ${variant.name}`);
        }
      }

      const newConsignment = await tx.consignment.create({
        data: {
          consignmentNumber,
          clientId,
          userId: user.userId,
          warehouseId,
          shipDate: shipDate ? new Date(shipDate) : new Date(),
          dueDate: dueDate ? new Date(dueDate) : undefined,
          notes,
          status: 'ACTIVE',
          items: {
            create: items.map(item => ({
              variantId: item.variantId,
              quantitySent: item.quantitySent,
              unitPrice: item.unitPrice,
            })),
          },
        },
        include: { items: { include: { variant: true } }, client: true },
      });

      // Deduct stock for consigned items
      for (const item of items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stockQuantity: { decrement: item.quantitySent } },
        });
      }

      return newConsignment;
    });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId, action: 'CREATE', entityType: 'Consignment',
      entityId: consignment.id, newValues: { consignmentNumber, clientId, items: items.length },
      ...clientInfo,
    });

    return NextResponse.json({ data: consignment }, { status: 201 });
  } catch (error: any) {
    if (error.message?.includes('Insufficient stock') || error.message?.includes('not found')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Create consignment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);
