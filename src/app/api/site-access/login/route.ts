import { NextRequest, NextResponse } from "next/server";

const SITE_ACCESS_COOKIE = "site_access_session";
const DEFAULT_SITE_ACCESS_PASSWORD = "AnilBonds-2026-V7q9!";

export async function POST(request: NextRequest) {
  const expectedPassword = process.env.SITE_ACCESS_PASSWORD ?? DEFAULT_SITE_ACCESS_PASSWORD;
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  const next = sanitizeNext(String(formData.get("next") ?? "/"));

  if (password !== expectedPassword) {
    const loginUrl = new URL("/site-access", getRequestOrigin(request));
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("next", next);
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const response = NextResponse.redirect(new URL(next, getRequestOrigin(request)), { status: 303 });
  response.cookies.set(SITE_ACCESS_COOKIE, expectedPassword, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

function sanitizeNext(next: string) {
  if (!next.startsWith("/") || next.startsWith("//")) return "/";
  if (next.startsWith("/site-access")) return "/";
  return next;
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
