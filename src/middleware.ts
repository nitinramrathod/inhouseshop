// export { default } from "next-auth/middleware";

// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { getToken } from "next-auth/jwt"

// export async function middleware(req: NextRequest) {

//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   })
//   const { pathname } = req.nextUrl

//   // 🚫 Logged-in user visiting login page
//   if (token && pathname === "/signin") {
//     return NextResponse.redirect(new URL("/admin", req.url))
//   }

//   // 🔒 Not logged-in user visiting protected routes
//   if (!token && pathname.startsWith("/admin")) {
//     return NextResponse.redirect(new URL("/signin", req.url))
//   }

//   return NextResponse.next()
// }


// export const config = {
//   matcher: ["/signin", "/admin/:path*"],
// };

export { default } from "next-auth/middleware";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  /* ---------------- PUBLIC ROUTES ---------------- */
  const publicRoutes = ["/signin", "/register"];

  if (!token && publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  /* ---------------- NOT LOGGED IN ---------------- */
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const role = token.role; // ADMIN | BUYER

  /* ---------------- ADMIN ROUTES ---------------- */
  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/my-profile", req.url));
    }
  }

  /* ---------------- BUYER ROUTES ---------------- */
  if (pathname.startsWith("/my-profile")) {
    if (role !== "BUYER") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  /* ---------------- PREVENT LOGIN PAGE ACCESS ---------------- */
  if (token && (pathname === "/signin" || pathname === "/register")) {
    return role === "ADMIN"
      ? NextResponse.redirect(new URL("/admin", req.url))
      : NextResponse.redirect(new URL("/my-profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin",
    "/register",
    "/admin/:path*",
    "/my-profile/:path*",
  ],
};
