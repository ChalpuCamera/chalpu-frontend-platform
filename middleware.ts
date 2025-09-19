// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// Public paths that don't require authentication
const publicPaths = [
  '/owner',
  '/customer',
  '/owner/oauth2/success',
  '/owner/oauth2/failure',
  '/customer/oauth2/success',
  '/customer/oauth2/failure',
];

// Protected paths that require authentication
const protectedPaths = [
  '/owner/home',
  '/owner/mypage',
  '/owner/menu',
  '/customer/home',
  '/customer/mypage',
  '/customer/menu',
];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // 서브도메인별 라우팅
  // owner.chalpu.com 또는 owner.localhost:3000
  if (hostname.includes('owner.chalpu.com') || hostname.includes('owner.localhost')) {
    if (!pathname.startsWith('/owner')) {
      const url = request.nextUrl.clone();
      url.pathname = `/owner${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // customer.chalpu.com 또는 customer.localhost:3000
  if (hostname.includes('customer.chalpu.com') || hostname.includes('customer.localhost')) {
    if (!pathname.startsWith('/customer')) {
      const url = request.nextUrl.clone();
      url.pathname = `/customer${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // 메인 도메인 또는 IP 접속 시 owner로 리다이렉트
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/owner', request.url));
  }

  // Check if path is protected or public
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isPublicPath = publicPaths.some(path => pathname === path);

  // Only check auth for protected paths (skip for public paths)
  if (isProtectedPath && !isPublicPath) {
    // Get token from cookie (set by auth store)
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      // Redirect to login page based on path
      const role = pathname.includes('/owner') ? 'owner' : 'customer';
      const loginUrl = new URL(`/${role}`, request.url);

      // Save the original URL to redirect back after login
      loginUrl.searchParams.set('redirect', pathname);

      return NextResponse.redirect(loginUrl);
    }

    // TODO: Validate token and check role
    // This would require decoding the JWT and checking expiry/role
    // For now, we rely on client-side validation in AuthProvider
  }

  const response = NextResponse.next();

  // Set security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next (Next.js internals)
     * - static files (images, fonts, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};