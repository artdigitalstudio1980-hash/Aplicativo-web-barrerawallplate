import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/api-middleware';

export const GET = withAuth(async (req, { user }) => {
  try {
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatarUrl: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ data: userData });
  } catch (error) {
    console.error('Get me error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
