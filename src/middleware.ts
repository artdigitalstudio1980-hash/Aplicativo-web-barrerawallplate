import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'barrera-wallplate-secret-key-change-in-production-2026'
);

const publicPaths = [
  '/',
  '/product',
  '/contact',
  '/faq',
  '/about',
  '/checkout',
  '/design-system',
  '/login',
  '/register',
  '/forgot-password',
];

const apiPublicPaths = [
  '/api/v1/auth/login',
  '/api/v1/auth/register',
  '/api/v1/auth/refresh',
  '/api/v1/products',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (publicPaths.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    // Exception: /product is public but /products (admin) is not
    if (pathname.startsWith('/admin')) {
      // Fall through to auth check
    } else {
      return NextResponse.next();
    }
  }

  // Allow public API paths (GET only for products)
  if (apiPublicPaths.some(p => pathname.startsWith(p))) {
    if (pathname.startsWith('/api/v1/products') && req.method === 'GET') {
      return NextResponse.next();
    }
    if (pathname.startsWith('/api/v1/auth/')) {
      return NextResponse.next();
    }
  }

  // Allow static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Check auth for /admin/* routes
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('access_token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET, {
        issuer: 'barrera-wallplate',
      });

      const role = (payload as Record<string, unknown>).role as string;

      // Only ADMIN and VENDEDOR can access admin panel
      if (role !== 'ADMIN' && role !== 'VENDEDOR') {
        return NextResponse.redirect(new URL('/', req.url));
      }

      // VENDEDOR restrictions — cannot access user management or settings
      if (role === 'VENDEDOR' && (pathname.startsWith('/admin/users'))) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }

      return NextResponse.next();
    } catch {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/v1/:path*',
  ],
};
