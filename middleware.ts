import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const verified = token && verifyJWT(token);

  if (!verified) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
