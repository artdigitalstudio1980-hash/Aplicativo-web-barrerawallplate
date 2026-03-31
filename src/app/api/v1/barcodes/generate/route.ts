import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { generateBarcodeDataUri, generateCode128, generateEAN13 } from '@/lib/barcode';
import { logAudit, getClientInfo } from '@/lib/audit';
import { z } from 'zod';

const generateBarcodeSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  type: z.enum(['EAN13', 'CODE128', 'QR']).optional().default('CODE128'),
  customCode: z.string().optional(),
});

// POST /api/v1/barcodes/generate — Admin: generate barcode
export const POST = withAuth(async (req, { user }) => {
  try {
    const body = await req.json();
    const parsed = generateBarcodeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { productId, variantId, type, customCode } = parsed.data;

    // Verify product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Generate unique code
    let code = customCode;
    if (!code) {
      if (type === 'EAN13') {
        code = generateEAN13();
      } else {
        code = generateCode128('BWP');
      }
    }

    // Check uniqueness
    const existing = await prisma.barcode.findUnique({ where: { code } });
    if (existing) {
      return NextResponse.json({ error: 'Barcode code already exists' }, { status: 409 });
    }

    // Generate barcode image
    const barcodeFormat = type === 'EAN13' ? 'ean13' : type === 'QR' ? 'qrcode' : 'code128';
    const imageUrl = await generateBarcodeDataUri({ text: code, format: barcodeFormat });

    const barcode = await prisma.barcode.create({
      data: {
        productId,
        variantId,
        code,
        type,
        imageUrl,
      },
      include: { product: true, variant: true },
    });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId,
      action: 'CREATE',
      entityType: 'Barcode',
      entityId: barcode.id,
      newValues: { code, type, productId },
      ...clientInfo,
    });

    return NextResponse.json({ data: barcode }, { status: 201 });
  } catch (error) {
    console.error('Generate barcode error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);
