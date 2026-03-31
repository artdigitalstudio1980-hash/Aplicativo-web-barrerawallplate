import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, generateTokenPair } from '@/lib/auth';
import { registerSchema } from '@/lib/validators/auth';
import { logAudit, getClientInfo } from '@/lib/audit';
import { withAuth } from '@/lib/api-middleware';

// Only ADMIN can register new users
export const POST = withAuth(async (req, { user }) => {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName, phone, role } = parsed.data;

    // Check if email already exists
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        phone,
        role: role as 'ADMIN' | 'VENDEDOR' | 'USUARIO',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    // Audit log
    const clientInfo = getClientInfo(req);
    await logAudit({
      userId: user.userId,
      action: 'CREATE',
      entityType: 'User',
      entityId: newUser.id,
      newValues: { email: newUser.email, role: newUser.role },
      ...clientInfo,
    });

    return NextResponse.json({ data: newUser }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
