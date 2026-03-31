import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';
import { startOfDay, startOfWeek, startOfMonth, subDays } from 'date-fns';

// GET /api/v1/reports/[type]
export const GET = withAuth(async (req, { params }) => {
  try {
    const type = params?.type;

    switch (type) {
      case 'dashboard': {
        const today = startOfDay(new Date());
        const weekStart = startOfWeek(new Date());
        const monthStart = startOfMonth(new Date());

        const [
          totalProducts,
          totalClients,
          todaySales,
          weekSales,
          monthSales,
          lowStockCount,
          activeConsignments,
          pendingInvoices,
          recentSales,
        ] = await Promise.all([
          prisma.product.count({ where: { isActive: true } }),
          prisma.client.count({ where: { isActive: true } }),
          prisma.sale.aggregate({ where: { saleDate: { gte: today }, status: { not: 'CANCELLED' } }, _sum: { total: true }, _count: true }),
          prisma.sale.aggregate({ where: { saleDate: { gte: weekStart }, status: { not: 'CANCELLED' } }, _sum: { total: true }, _count: true }),
          prisma.sale.aggregate({ where: { saleDate: { gte: monthStart }, status: { not: 'CANCELLED' } }, _sum: { total: true }, _count: true }),
          prisma.$queryRawUnsafe<[{ count: bigint }]>(`SELECT COUNT(*) as count FROM product_variants WHERE is_active = true AND stock_quantity <= min_stock_alert`),
          prisma.consignment.count({ where: { status: { in: ['ACTIVE', 'PENDING'] } } }),
          prisma.invoice.count({ where: { status: { in: ['DRAFT', 'SENT', 'OVERDUE'] } } }),
          prisma.sale.findMany({
            where: { status: { not: 'CANCELLED' } },
            include: { client: { select: { contactName: true } }, user: { select: { firstName: true, lastName: true } } },
            orderBy: { createdAt: 'desc' },
            take: 10,
          }),
        ]);

        return NextResponse.json({
          data: {
            overview: {
              totalProducts,
              totalClients,
              lowStockAlerts: Number(lowStockCount[0]?.count || 0),
              activeConsignments,
              pendingInvoices,
            },
            sales: {
              today: { count: todaySales._count, total: Number(todaySales._sum.total || 0) },
              week: { count: weekSales._count, total: Number(weekSales._sum.total || 0) },
              month: { count: monthSales._count, total: Number(monthSales._sum.total || 0) },
            },
            recentSales,
          },
        });
      }

      case 'sales-summary': {
        const days = parseInt(new URL(req.url).searchParams.get('days') || '30');
        const since = subDays(new Date(), days);

        const sales = await prisma.sale.groupBy({
          by: ['status'],
          where: { createdAt: { gte: since } },
          _count: true,
          _sum: { total: true },
        });

        return NextResponse.json({ data: sales });
      }

      case 'top-products': {
        const topProducts = await prisma.saleItem.groupBy({
          by: ['variantId'],
          _sum: { quantity: true, total: true },
          orderBy: { _sum: { total: 'desc' } },
          take: 10,
        });

        const variantIds = topProducts.map(tp => tp.variantId);
        const variants = await prisma.productVariant.findMany({
          where: { id: { in: variantIds } },
          include: { product: { select: { name: true } } },
        });

        const enriched = topProducts.map(tp => ({
          ...tp,
          variant: variants.find(v => v.id === tp.variantId),
        }));

        return NextResponse.json({ data: enriched });
      }

      default:
        return NextResponse.json({ error: 'Unknown report type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Report error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['ADMIN']);
