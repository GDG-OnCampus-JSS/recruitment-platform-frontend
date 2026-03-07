import { NextRequest, NextResponse } from 'next/server';
import { apiEndPoints } from '@/api/apiEndpoints';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

// Single source of truth for protected route definitions.
// `config.matcher` is derived from these at the bottom of the file.
const PROTECTED_ROUTES = {
  user: {
    paths: ['/dashboard', '/coding-platform'],
    validationEndpoint: apiEndPoints.users.me,
    loginUrl: '/login',
  },
  admin: {
    paths: ['/admin/dashboard'],
    validationEndpoint: apiEndPoints.admin.me,
    loginUrl: '/admin/login',
  },
} as const;

function matchesProtectedPaths(pathname: string, paths: readonly string[]): boolean {
  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

async function validateSession(request: NextRequest, validationEndpoint: string): Promise<boolean> {
  if (!BACKEND_URL) {
    console.error('[middleware] NEXT_PUBLIC_API_URL is not configured');
    return false;
  }

  try {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return false;
    }

    // Use URL constructor to safely join base and path regardless of trailing/leading slashes
    const url = new URL(validationEndpoint, BACKEND_URL);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        cookie: cookieHeader,
      },
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

  for (const route of Object.values(PROTECTED_ROUTES)) {
    if (matchesProtectedPaths(pathname, route.paths)) {
      const isValid = await validateSession(request, route.validationEndpoint);

      if (!isValid) {
        const loginUrl = new URL(route.loginUrl, request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

// IMPORTANT: config.matcher must be static string literals (Next.js parses these at compile time).
// Keep these in sync with PROTECTED_ROUTES.paths above.
export const config = {
  matcher: ['/dashboard/:path*', '/coding-platform/:path*', '/admin/dashboard/:path*'],
};
