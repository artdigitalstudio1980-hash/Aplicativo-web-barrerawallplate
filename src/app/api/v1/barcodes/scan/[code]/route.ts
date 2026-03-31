import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';

// GET /api/v1/barcodes/scan/[code] — Scan barcode and return product info
export const GET = withAuth(async (req, { params }) => {
  try {
    const code = params?.code;
    if (!code) return NextResponse.json({ error: 'Barcode code required' }, { status: 400 });

    const barcode = await prisma.barcode.findUnique({
      where: { code },
      include: {
        product: {
          include: {
            variants: { where: { isActive: true } },
          },
        },
        variant: true,
      },
    });

    if (!barcode) {
      return NextResponse.json({ error: 'Barcode not found' }, { status: 404 });
    }

    return NextResponse.json({ data: barcode });
  } catch (error) {
    console.error('Scan barcode error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);
