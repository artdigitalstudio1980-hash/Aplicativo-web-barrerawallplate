import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { createClientSchema } from '@/lib/validators/consignment';
import { logAudit, getClientInfo } from '@/lib/audit';

// GET /api/v1/clients
export const GET = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    const where = {
      isActive: true,
      ...(search ? {
        OR: [
          { contactName: { contains: search, mode: 'insensitive' as const } },
          { companyName: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
        ],
      } : {}),
      ...(type ? { type: type as any } : {}),
    };

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        include: {
          _count: { select: { sales: true, consignments: true, invoices: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.client.count({ where }),
    ]);

    return NextResponse.json({
      data: clients,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('List clients error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);

// POST /api/v1/clients
export const POST = withAuth(async (req, { user }) => {
  try {
    const body = await req.json();
    const parsed = createClientSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const client = await prisma.client.create({ data: parsed.data });

    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId, action: 'CREATE', entityType: 'Client',
      entityId: client.id, newValues: { contactName: client.contactName, type: client.type },
      ...clientInfo,
    });

    return NextResponse.json({ data: client }, { status: 201 });
  } catch (error) {
    console.error('Create client error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);
