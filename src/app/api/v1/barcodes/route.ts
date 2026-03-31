import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';

// GET /api/v1/barcodes — List barcodes
export const GET = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

    const where = productId ? { productId } : {};

    const [barcodes, total] = await Promise.all([
      prisma.barcode.findMany({
        where,
        include: { product: { select: { name: true, sku: true } }, variant: { select: { name: true, sku: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.barcode.count({ where }),
    ]);

    return NextResponse.json({
      data: barcodes,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('List barcodes error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);
