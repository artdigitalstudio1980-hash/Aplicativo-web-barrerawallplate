import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { createWarehouseSchema } from '@/lib/validators/consignment';
import { logAudit, getClientInfo } from '@/lib/audit';

// GET /api/v1/warehouses
export const GET = withAuth(async (req) => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ data: warehouses });
  } catch (error) {
    console.error('List warehouses error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);

// POST /api/v1/warehouses
export const POST = withAuth(async (req, { user }) => {
  try {
    const body = await req.json();
    const parsed = createWarehouseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const warehouse = await prisma.warehouse.create({ data: parsed.data });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId, action: 'CREATE', entityType: 'Warehouse',
      entityId: warehouse.id, newValues: { name: warehouse.name },
      ...clientInfo,
    });

    return NextResponse.json({ data: warehouse }, { status: 201 });
  } catch (error) {
    console.error('Create warehouse error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);
