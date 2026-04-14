import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en"] as const;
const defaultLocale = "fr";

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage.split(",")[0].split("-")[0].trim();
  return locales.includes(preferred as (typeof locales)[number]) ? preferred : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and API routes entirely
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(png|svg|ico|jpg|jpeg|gif|webp|woff2?|ttf|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale prefix
  const pathnameLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!pathnameLocale) {
    // Redirect to add locale prefix, preserving the path
    const locale = getPreferredLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Skip the login page (access check not needed there)
  const loginPath = `/${pathnameLocale}/login`;
  if (pathname === loginPath || pathname.startsWith(`${loginPath}/`)) {
    return NextResponse.next();
  }

  // Access code check
  const accessToken = request.cookies.get("access-token")?.value;
  if (accessToken === process.env.ACCESS_CODE) {
    return NextResponse.next();
  }

  // Redirect to locale-aware login, preserving the destination
  const loginUrl = new URL(loginPath, request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
