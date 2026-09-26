import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  if (!isMaintenance) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Te scieżki maja zawsze dzialac, nawet w trybie "wkrotce":
  // /wkrotce (sama strona zapowiedzi, zeby nie zapetlic przekierowania),
  // /studio (panel Sanity, zebys mogl dalej zarzadzac produktami),
  // /logo.png (logo uzywane na stronie zapowiedzi).
  if (
    pathname.startsWith("/wkrotce") ||
    pathname.startsWith("/studio") ||
    pathname === "/logo.png"
  ) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/wkrotce", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
