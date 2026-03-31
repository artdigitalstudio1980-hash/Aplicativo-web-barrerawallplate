import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { updateProductSchema, createVariantSchema } from '@/lib/validators/product';
import { logAudit, getClientInfo } from '@/lib/audit';

// GET /api/v1/products/[id] — Public
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: { where: { isActive: true }, orderBy: { name: 'asc' } },
        barcodes: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/v1/products/[id] — Admin only
export const PUT = withAuth(async (req, { params, user }) => {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

    const body = await req.json();
    const parsed = updateProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: parsed.data,
      include: { variants: true, barcodes: true },
    });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId,
      action: 'UPDATE',
      entityType: 'Product',
      entityId: id,
      oldValues: { name: existing.name, sku: existing.sku },
      newValues: parsed.data,
      ...clientInfo,
    });

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);

// DELETE /api/v1/products/[id] — Admin only (soft delete)
export const DELETE = withAuth(async (req, { params, user }) => {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId,
      action: 'DELETE',
      entityType: 'Product',
      entityId: id,
      ...clientInfo,
    });

    return NextResponse.json({ data: { message: 'Product deactivated' } });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);

// POST /api/v1/products/[id] — Admin: add variant to product
export const POST = withAuth(async (req, { params, user }) => {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

    const body = await req.json();
    const parsed = createVariantSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const variant = await prisma.productVariant.create({
      data: {
        productId: id,
        ...parsed.data,
      },
    });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId,
      action: 'CREATE',
      entityType: 'ProductVariant',
      entityId: variant.id,
      newValues: { name: variant.name, sku: variant.sku },
      ...clientInfo,
    });

    return NextResponse.json({ data: variant }, { status: 201 });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'SKU already exists' }, { status: 409 });
    }
    console.error('Create variant error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);
