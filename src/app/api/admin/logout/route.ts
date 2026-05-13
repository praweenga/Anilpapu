import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "studio_session";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/studio/login", request.url), {
    status: 303,
  });

  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
