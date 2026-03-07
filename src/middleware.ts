import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

// Routes that require user authentication
const USER_PROTECTED_PATHS = ['/dashboard', '/coding-platform'];

// Routes that require admin authentication
const ADMIN_PROTECTED_PATHS = ['/admin/dashboard'];

// Public routes that authenticated users should NOT be redirected away from
// (login, register, etc. are handled separately)

function isUserProtectedRoute(pathname: string): boolean {
  return USER_PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function isAdminProtectedRoute(pathname: string): boolean {
  return ADMIN_PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

async function validateSession(request: NextRequest, validationEndpoint: string): Promise<boolean> {
  if (!BACKEND_URL) {
    console.error('[middleware] NEXT_PUBLIC_API_URL is not configured');
    return false;
  }

  try {
    // Forward all cookies from the browser to the backend validation endpoint
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return false;
    }

    const response = await fetch(`${BACKEND_URL}${validationEndpoint}`, {
      method: 'GET',
      headers: {
        cookie: cookieHeader,
      },
      // Short timeout so middleware doesn't block forever
      signal: AbortSignal.timeout(5000),
    });

    return response.ok;
  } catch (error) {
    console.error('[middleware] Session validation failed:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- User protected routes ---
  if (isUserProtectedRoute(pathname)) {
    const isValid = await validateSession(request, 'users/me');

    if (!isValid) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // --- Admin protected routes ---
  if (isAdminProtectedRoute(pathname)) {
    const isValid = await validateSession(request, 'admin/auth/me');

    if (!isValid) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // User protected routes
    '/dashboard/:path*',
    '/coding-platform/:path*',
    // Admin protected routes
    '/admin/dashboard/:path*',
  ],
};
