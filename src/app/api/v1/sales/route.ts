import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { createSaleSchema } from '@/lib/validators/sale';
import { logAudit, getClientInfo } from '@/lib/audit';
import { format } from 'date-fns';

// GET /api/v1/sales — List sales
export const GET = withAuth(async (req, { user }) => {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    const where = {
      ...(status ? { status: status as any } : {}),
      // VENDEDOR can only see their own sales
      ...(user.role === 'VENDEDOR' ? { userId: user.userId } : {}),
    };

    const [sales, total] = await Promise.all([
      prisma.sale.findMany({
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
      prisma.sale.count({ where }),
    ]);

    return NextResponse.json({
      data: sales,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('List sales error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);

// POST /api/v1/sales — Create sale
export const POST = withAuth(async (req, { user }) => {
  try {
    const body = await req.json();
    const parsed = createSaleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { clientId, warehouseId, paymentMethod, notes, items } = parsed.data;

    // Generate sale number: BWP-SALE-YYYYMMDD-XXXX
    const today = format(new Date(), 'yyyyMMdd');
    const count = await prisma.sale.count({
      where: { saleNumber: { startsWith: `BWP-SALE-${today}` } },
    });
    const saleNumber = `BWP-SALE-${today}-${String(count + 1).padStart(4, '0')}`;

    // Calculate totals
    const TAX_RATE = 0.07; // Florida sales tax
    const saleItems = items.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount,
      total: (item.unitPrice * item.quantity) - item.discount,
    }));

    const subtotal = saleItems.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = subtotal * TAX_RATE;
    const total = subtotal + taxAmount;

    // Create sale with items in transaction, update stock
    const sale = await prisma.$transaction(async (tx) => {
      // Verify stock availability
      for (const item of items) {
        const variant = await tx.productVariant.findUnique({ where: { id: item.variantId } });
        if (!variant) throw new Error(`Variant ${item.variantId} not found`);
        if (variant.stockQuantity < item.quantity) {
          throw new Error(`Insufficient stock for ${variant.name}. Available: ${variant.stockQuantity}`);
        }
      }

      // Create sale
      const newSale = await tx.sale.create({
        data: {
          saleNumber,
          clientId,
          userId: user.userId,
          warehouseId,
          paymentMethod,
          notes,
          subtotal,
          taxAmount,
          total,
          status: 'CONFIRMED',
          items: {
            create: saleItems,
          },
        },
        include: {
          items: { include: { variant: { include: { product: { select: { name: true } } } } } },
          client: true,
        },
      });

      // Deduct stock
      for (const item of items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stockQuantity: { decrement: item.quantity } },
        });
      }

      return newSale;
    });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId,
      action: 'CREATE',
      entityType: 'Sale',
      entityId: sale.id,
      newValues: { saleNumber, total, items: items.length },
      ...clientInfo,
    });

    return NextResponse.json({ data: sale }, { status: 201 });
  } catch (error: any) {
    if (error.message?.includes('Insufficient stock') || error.message?.includes('not found')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Create sale error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);
