import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { updateSaleStatusSchema } from '@/lib/validators/sale';
import { logAudit, getClientInfo } from '@/lib/audit';

// GET /api/v1/sales/[id]
export const GET = withAuth(async (req, { params, user }) => {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Sale ID required' }, { status: 400 });

    const sale = await prisma.sale.findUnique({
      where: { id },
      include: {
        client: true,
        user: { select: { firstName: true, lastName: true, email: true } },
        warehouse: { select: { name: true } },
        items: { include: { variant: { include: { product: true } } } },
        invoice: true,
      },
    });

    if (!sale) return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
    if (user.role === 'VENDEDOR' && sale.userId !== user.userId) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json({ data: sale });
  } catch (error) {
    console.error('Get sale error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);

// PUT /api/v1/sales/[id] — Update sale status
export const PUT = withAuth(async (req, { params, user }) => {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Sale ID required' }, { status: 400 });

    const body = await req.json();
    const parsed = updateSaleStatusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const existing = await prisma.sale.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Sale not found' }, { status: 404 });

    const sale = await prisma.sale.update({
      where: { id },
      data: { status: parsed.data.status },
      include: { items: true, client: true },
    });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId, action: 'UPDATE', entityType: 'Sale', entityId: id,
      oldValues: { status: existing.status }, newValues: { status: parsed.data.status },
      ...clientInfo,
    });

    return NextResponse.json({ data: sale });
  } catch (error) {
    console.error('Update sale error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);
