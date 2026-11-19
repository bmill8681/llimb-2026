import { NextRequest, NextResponse } from "next/server";
import { isPinballAuthenticated } from "@/app/public-house-pinball/auth";

// Gate every Public House Pinball build file (public/public-house-pinball/**) behind the
// password cookie. The page itself (/public-house-pinball) handles its own login.
export function proxy(request: NextRequest) {
  if (!isPinballAuthenticated(request)) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/public-house-pinball/:path+"],
};
