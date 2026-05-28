import { NextRequest, NextResponse } from "next/server";

const ADMIN_PROTECTED_PATHS = ["/studio", "/api/mux/direct-upload", "/api/content"];
const ADMIN_SESSION_COOKIE = "studio_session";
const SITE_ACCESS_COOKIE = "site_access_session";
const DEFAULT_SITE_ACCESS_PASSWORD = "AnilBonds-2026-V7q9!";
const SITE_ACCESS_PATHS = ["/site-access", "/api/site-access"];
const PUBLIC_SYSTEM_PATHS = ["/_next", "/favicon.ico", "/robots.txt", "/sitemap.xml", "/api/admin", "/api/mux/webhook"];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (ADMIN_PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    if (pathname.startsWith("/studio/login")) {
      return NextResponse.next();
    }

    const expected = process.env.ADMIN_UPLOAD_KEY;
    if (!expected) {
      return new NextResponse("ADMIN_UPLOAD_KEY is not configured.", { status: 500 });
    }

    const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const headerKey = request.headers.get("x-admin-upload-key");

    if (session === expected || headerKey === expected) return NextResponse.next();

    if (pathname.startsWith("/studio")) {
      const loginUrl = new URL("/studio/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (shouldSkipSiteAccess(pathname)) {
    return NextResponse.next();
  }

  const sitePassword = process.env.SITE_ACCESS_PASSWORD ?? DEFAULT_SITE_ACCESS_PASSWORD;
  const siteSession = request.cookies.get(SITE_ACCESS_COOKIE)?.value;

  if (siteSession === sitePassword) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.json({ error: "Site access required." }, { status: 401 });
  }

  const loginUrl = new URL("/site-access", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

function shouldSkipSiteAccess(pathname: string) {
  if (SITE_ACCESS_PATHS.some((path) => pathname.startsWith(path))) return true;
  if (PUBLIC_SYSTEM_PATHS.some((path) => pathname.startsWith(path))) return true;
  if (pathname.startsWith("/studio")) return true;
  return false;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
