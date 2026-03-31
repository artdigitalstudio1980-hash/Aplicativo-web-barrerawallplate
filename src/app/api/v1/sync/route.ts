import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { z } from 'zod';

const syncPushSchema = z.object({
  operations: z.array(z.object({
    entityType: z.string(),
    entityId: z.string().optional(),
    operation: z.enum(['CREATE', 'UPDATE', 'DELETE']),
    payload: z.record(z.string(), z.unknown()),
    clientTimestamp: z.string(),
  })),
});

// POST /api/v1/sync — Push offline changes
export const POST = withAuth(async (req, { user }) => {
  try {
    const body = await req.json();
    const parsed = syncPushSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    const results = [];
    for (const op of parsed.data.operations) {
      try {
        await prisma.syncQueue.create({
          data: {
            userId: user.userId,
            entityType: op.entityType,
            entityId: op.entityId,
            operation: op.operation,
            payload: op.payload as any,
            status: 'SYNCED',
            syncedAt: new Date(),
          },
        });
        results.push({ entityType: op.entityType, entityId: op.entityId, status: 'synced' });
      } catch (err) {
        results.push({ entityType: op.entityType, entityId: op.entityId, status: 'failed', error: String(err) });
      }
    }

    return NextResponse.json({ data: { results, syncedAt: new Date().toISOString() } });
  } catch (error) {
    console.error('Sync push error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);

// GET /api/v1/sync — Pull changes since timestamp
export const GET = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const since = searchParams.get('since');
    const sinceDate = since ? new Date(since) : new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [products, clients, sales] = await Promise.all([
      prisma.product.findMany({
        where: { updatedAt: { gte: sinceDate } },
        include: { variants: true, barcodes: true },
      }),
      prisma.client.findMany({
        where: { updatedAt: { gte: sinceDate } },
      }),
      prisma.sale.findMany({
        where: { updatedAt: { gte: sinceDate } },
        include: { items: true },
      }),
    ]);

    return NextResponse.json({
      data: { products, clients, sales },
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Sync pull error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN', 'VENDEDOR']);
