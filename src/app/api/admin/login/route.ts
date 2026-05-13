import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "studio_session";

export async function POST(request: NextRequest) {
  const expected = process.env.ADMIN_UPLOAD_KEY;
  if (!expected) {
    return NextResponse.json({ error: "ADMIN_UPLOAD_KEY is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/studio/uploads");

  if (password !== expected) {
    const loginUrl = new URL("/studio/login", request.url);
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("next", next.startsWith("/") ? next : "/studio/uploads");
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const response = NextResponse.redirect(new URL(next.startsWith("/") ? next : "/studio/uploads", request.url), { status: 303 });
  response.cookies.set(SESSION_COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
