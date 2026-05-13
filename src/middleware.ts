import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/studio", "/api/mux/direct-upload", "/api/content"];
const SESSION_COOKIE = "studio_session";

export function middleware(request: NextRequest) {
  if (!PROTECTED_PATHS.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/studio/login")) {
    return NextResponse.next();
  }

  const expected = process.env.ADMIN_UPLOAD_KEY;
  if (!expected) {
    return new NextResponse("ADMIN_UPLOAD_KEY is not configured.", { status: 500 });
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const headerKey = request.headers.get("x-admin-upload-key");

  if (session === expected || headerKey === expected) return NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/studio")) {
    const loginUrl = new URL("/studio/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.json({ error: "Authentication required." }, { status: 401 });
}

export const config = {
  matcher: ["/studio/:path*", "/api/mux/direct-upload/:path*", "/api/content/:path*"],
};
