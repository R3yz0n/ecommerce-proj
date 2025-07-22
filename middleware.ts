import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      //   return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      //   return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
