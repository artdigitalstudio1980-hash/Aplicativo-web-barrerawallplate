import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { updateInvoiceStatusSchema } from '@/lib/validators/invoice';
import { logAudit, getClientInfo } from '@/lib/audit';

// GET /api/v1/invoices/[id]
export const GET = withAuth(async (req, { params }) => {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Invoice ID required' }, { status: 400 });

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        client: true,
        user: { select: { firstName: true, lastName: true, email: true } },
        sale: {
          include: {
            items: { include: { variant: { include: { product: true } } } },
          },
        },
      },
    });

    if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });

    return NextResponse.json({ data: invoice });
  } catch (error) {
    console.error('Get invoice error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);

// PUT /api/v1/invoices/[id] — Update status
export const PUT = withAuth(async (req, { params, user }) => {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Invoice ID required' }, { status: 400 });

    const body = await req.json();
    const parsed = updateInvoiceStatusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    const existing = await prisma.invoice.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });

    const invoice = await prisma.invoice.update({
      where: { id },
      data: {
        status: parsed.data.status,
        ...(parsed.data.status === 'PAID' ? { paidDate: new Date() } : {}),
      },
      include: { client: true },
    });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId, action: 'UPDATE', entityType: 'Invoice', entityId: id,
      oldValues: { status: existing.status }, newValues: { status: parsed.data.status },
      ...clientInfo,
    });

    return NextResponse.json({ data: invoice });
  } catch (error) {
    console.error('Update invoice error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);
