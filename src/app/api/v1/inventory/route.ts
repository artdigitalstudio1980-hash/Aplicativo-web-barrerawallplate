import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';

// GET /api/v1/inventory — Stock summary
export const GET = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const warehouseId = searchParams.get('warehouseId');
    const lowStock = searchParams.get('lowStock') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

    const variants = await prisma.productVariant.findMany({
      where: {
        isActive: true,
        ...(lowStock ? { stockQuantity: { lte: prisma.productVariant.fields.minStockAlert } } : {}),
      },
      include: {
        product: { select: { name: true, category: true, sku: true } },
        barcodes: { select: { code: true, type: true } },
      },
      orderBy: lowStock ? { stockQuantity: 'asc' } : { product: { name: 'asc' } },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.productVariant.count({ where: { isActive: true } });

    // Get low stock alerts count
    const alertCount = await prisma.$queryRawUnsafe<[{ count: bigint }]>(
      `SELECT COUNT(*) as count FROM product_variants WHERE is_active = true AND stock_quantity <= min_stock_alert`
    );

    return NextResponse.json({
      data: variants,
      alerts: Number(alertCount[0]?.count || 0),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Inventory error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);
