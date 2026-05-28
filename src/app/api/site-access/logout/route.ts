import { NextRequest, NextResponse } from "next/server";

const SITE_ACCESS_COOKIE = "site_access_session";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/site-access", getRequestOrigin(request)), {
    status: 303,
  });

  response.cookies.set(SITE_ACCESS_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

function getRequestOrigin(request: NextRequest) {
  const headerOrigin = request.headers.get("origin") ?? request.headers.get("referer");

  if (headerOrigin) {
    try {
      return new URL(headerOrigin).origin;
    } catch {
      return request.nextUrl.origin;
    }
  }

  return request.nextUrl.origin;
}
