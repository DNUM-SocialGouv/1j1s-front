import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const FORBIDDEN_QUERY_LIST = [
  'gclid',
  'gclsrc',
  'xtor',
  'dclid',
  'utm_source',
  'utm_medium',
];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const sanitizedUrl = new URL(request.url);
  const currentSearchParams = Object.freeze(new URL(request.url).searchParams);
  let shouldSanitize = false;

  for (const key of currentSearchParams.keys()) {
    if (FORBIDDEN_QUERY_LIST.includes(key)) {
      sanitizedUrl.searchParams.delete(key);
      shouldSanitize = true;
    }
  }

  if (shouldSanitize) {
    return NextResponse.redirect(sanitizedUrl);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/image|_next/static|images/|favicons/|font|favicon.ico).*)',
};
