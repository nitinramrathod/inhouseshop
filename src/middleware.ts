export { default } from "next-auth/middleware";

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const { pathname } = req.nextUrl

  // 🚫 Logged-in user visiting login page
  if (token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  // 🔒 Not logged-in user visiting protected routes
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  return NextResponse.next()
}


export const config = {
  matcher: ["/signin", "/admin/:path*"],
};

