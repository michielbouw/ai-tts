export { auth as default } from '@/lib/auth';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - sign-in (auth page routes)
     * - api/auth (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!sign-in|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
