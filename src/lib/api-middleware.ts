import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, TokenPayload } from './auth';
import { UserRole } from '@/generated/prisma';

export interface AuthenticatedRequest extends NextRequest {
  user?: TokenPayload;
}

type RouteHandler = (
  req: NextRequest,
  context: { params?: Record<string, string>; user: TokenPayload }
) => Promise<NextResponse>;

/**
 * Wraps a route handler with JWT authentication
 */
export function withAuth(handler: RouteHandler, allowedRoles?: UserRole[]) {
  return async (req: NextRequest, ctx?: { params?: Promise<Record<string, string>> }) => {
    try {
      // Extract token from Authorization header or cookie
      const authHeader = req.headers.get('authorization');
      const token = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : req.cookies.get('access_token')?.value;

      if (!token) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      const payload = await verifyToken(token);
      if (!payload || payload.type !== 'access') {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Check role authorization
      if (allowedRoles && !allowedRoles.includes(payload.role)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      const params = ctx?.params ? await ctx.params : undefined;
      return handler(req, { params, user: payload });
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Wraps a route handler that is publicly accessible but optionally authenticated 
 */
export function withOptionalAuth(handler: RouteHandler) {
  return async (req: NextRequest, ctx?: { params?: Promise<Record<string, string>> }) => {
    try {
      const authHeader = req.headers.get('authorization');
      const token = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : req.cookies.get('access_token')?.value;

      let user: TokenPayload | undefined;
      if (token) {
        const payload = await verifyToken(token);
        if (payload && payload.type === 'access') {
          user = payload;
        }
      }

      const params = ctx?.params ? await ctx.params : undefined;
      return handler(req, { params, user: user as TokenPayload });
    } catch (error) {
      console.error('Optional auth middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Standard JSON error response
 */
export function apiError(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Standard JSON success response
 */
export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json({ data }, { status });
}
