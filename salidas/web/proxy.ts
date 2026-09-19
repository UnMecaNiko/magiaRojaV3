import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { localeFromAcceptLanguage } from "@/lib/locale";

export function proxy(request: NextRequest) {
  const locale = localeFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  const response = NextResponse.redirect(url, 302);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: "/",
};
