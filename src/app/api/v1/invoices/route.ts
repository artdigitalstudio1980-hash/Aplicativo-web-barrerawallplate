import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { createInvoiceSchema } from '@/lib/validators/invoice';
import { logAudit, getClientInfo } from '@/lib/audit';
import { format } from 'date-fns';

// GET /api/v1/invoices
export const GET = withAuth(async (req, { user }) => {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    const where = {
      ...(status ? { status: status as any } : {}),
      ...(user.role === 'VENDEDOR' ? { userId: user.userId } : {}),
    };

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        include: {
          client: { select: { contactName: true, companyName: true } },
          user: { select: { firstName: true, lastName: true } },
          sale: { select: { saleNumber: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.invoice.count({ where }),
    ]);

    return NextResponse.json({
      data: invoices,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('List invoices error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);

// POST /api/v1/invoices
export const POST = withAuth(async (req, { user }) => {
  try {
    const body = await req.json();
    const parsed = createInvoiceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const today = format(new Date(), 'yyyyMMdd');
    const count = await prisma.invoice.count({
      where: { invoiceNumber: { startsWith: `BWP-INV-${today}` } },
    });
    const invoiceNumber = `BWP-INV-${today}-${String(count + 1).padStart(4, '0')}`;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        saleId: parsed.data.saleId,
        clientId: parsed.data.clientId,
        userId: user.userId,
        subtotal: parsed.data.subtotal,
        taxAmount: parsed.data.taxAmount,
        total: parsed.data.total,
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : undefined,
        notes: parsed.data.notes,
        status: 'DRAFT',
      },
      include: { client: true, sale: true },
    });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId, action: 'CREATE', entityType: 'Invoice',
      entityId: invoice.id, newValues: { invoiceNumber, total: invoice.total },
      ...clientInfo,
    });

    return NextResponse.json({ data: invoice }, { status: 201 });
  } catch (error) {
    console.error('Create invoice error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);
