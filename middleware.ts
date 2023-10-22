export { auth as default } from '@/lib/auth';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - authenticate (auth page routes)
     * - api/auth (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!authenticate|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
