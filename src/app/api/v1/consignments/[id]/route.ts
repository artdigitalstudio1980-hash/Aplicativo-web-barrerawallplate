import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { updateConsignmentSchema } from '@/lib/validators/consignment';
import { logAudit, getClientInfo } from '@/lib/audit';

// GET /api/v1/consignments/[id]
export const GET = withAuth(async (req, { params }) => {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const consignment = await prisma.consignment.findUnique({
      where: { id },
      include: {
        client: true,
        user: { select: { firstName: true, lastName: true } },
        warehouse: true,
        items: { include: { variant: { include: { product: true } } } },
      },
    });

    if (!consignment) return NextResponse.json({ error: 'Consignment not found' }, { status: 404 });

    return NextResponse.json({ data: consignment });
  } catch (error) {
    console.error('Get consignment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);

// PUT /api/v1/consignments/[id] — Update consignment (returns, settlement)
export const PUT = withAuth(async (req, { params, user }) => {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const body = await req.json();
    const parsed = updateConsignmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const consignment = await prisma.$transaction(async (tx) => {
      // Update item quantities if provided
      if (parsed.data.items) {
        for (const item of parsed.data.items) {
          const existingItem = await tx.consignmentItem.findUnique({ where: { id: item.id } });
          if (!existingItem) continue;

          const returnedDiff = (item.quantityReturned || 0) - existingItem.quantityReturned;
          
          await tx.consignmentItem.update({
            where: { id: item.id },
            data: {
              ...(item.quantitySold !== undefined ? { quantitySold: item.quantitySold } : {}),
              ...(item.quantityReturned !== undefined ? { quantityReturned: item.quantityReturned } : {}),
            },
          });

          // Return stock for returned items
          if (returnedDiff > 0) {
            await tx.productVariant.update({
              where: { id: existingItem.variantId },
              data: { stockQuantity: { increment: returnedDiff } },
            });
          }
        }
      }

      return tx.consignment.update({
        where: { id },
        data: { ...(parsed.data.status ? { status: parsed.data.status } : {}) },
        include: { items: { include: { variant: true } }, client: true },
      });
    });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId, action: 'UPDATE', entityType: 'Consignment',
      entityId: id, newValues: parsed.data, ...clientInfo,
    });

    return NextResponse.json({ data: consignment });
  } catch (error) {
    console.error('Update consignment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);
