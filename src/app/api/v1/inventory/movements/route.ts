import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { inventoryMovementSchema } from '@/lib/validators/consignment';
import { logAudit, getClientInfo } from '@/lib/audit';

// GET /api/v1/inventory/movements — List movements
export const GET = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const variantId = searchParams.get('variantId');
    const warehouseId = searchParams.get('warehouseId');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

    const where = {
      ...(variantId ? { variantId } : {}),
      ...(warehouseId ? { warehouseId } : {}),
      ...(type ? { type: type as any } : {}),
    };

    const [movements, total] = await Promise.all([
      prisma.inventoryMovement.findMany({
        where,
        include: {
          variant: { include: { product: { select: { name: true } } } },
          warehouse: { select: { name: true } },
          user: { select: { firstName: true, lastName: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.inventoryMovement.count({ where }),
    ]);

    return NextResponse.json({
      data: movements,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('List movements error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);

// POST /api/v1/inventory/movements — Record movement
export const POST = withAuth(async (req, { user }) => {
  try {
    const body = await req.json();
    const parsed = inventoryMovementSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { variantId, warehouseId, type, quantity, reason, referenceId } = parsed.data;

    // Validate variant exists
    const variant = await prisma.productVariant.findUnique({ where: { id: variantId } });
    if (!variant) {
      return NextResponse.json({ error: 'Product variant not found' }, { status: 404 });
    }

    // Calculate stock change
    const stockChange = (type === 'ENTRADA' || type === 'AJUSTE') ? quantity : -quantity;
    const newStock = variant.stockQuantity + stockChange;

    if (newStock < 0) {
      return NextResponse.json({ error: 'Insufficient stock for this operation' }, { status: 400 });
    }

    // Create movement and update stock in transaction
    const [movement] = await prisma.$transaction([
      prisma.inventoryMovement.create({
        data: {
          variantId,
          warehouseId,
          userId: user.userId,
          type,
          quantity,
          reason,
          referenceId,
        },
        include: {
          variant: { include: { product: { select: { name: true } } } },
          warehouse: { select: { name: true } },
        },
      }),
      prisma.productVariant.update({
        where: { id: variantId },
        data: { stockQuantity: newStock },
      }),
    ]);

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId,
      action: 'CREATE',
      entityType: 'InventoryMovement',
      entityId: movement.id,
      newValues: { type, quantity, variantId, warehouseId },
      ...clientInfo,
    });

    return NextResponse.json({ data: movement }, { status: 201 });
  } catch (error) {
    console.error('Create movement error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);
