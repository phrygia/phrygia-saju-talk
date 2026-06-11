import { createServerClient } from "@supabase/ssr";
import type { CookieMethodsServer } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const cookieMethods: CookieMethodsServer = {
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value }) =>
        request.cookies.set(name, value),
      );

      supabaseResponse = NextResponse.next({ request });

      cookiesToSet.forEach(({ name, value, options }) =>
        supabaseResponse.cookies.set(name, value, options),
      );
    },
  };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieMethods,
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  const isPrivacyPage = request.nextUrl.pathname.startsWith("/privacy-policy");
  const isLandingPage = request.nextUrl.pathname.startsWith("/landing");
  const isPublicFile =
    request.nextUrl.pathname === "/app-ads.txt" ||
    request.nextUrl.pathname === "/ads.txt";

  if (!isPrivacyPage && !isLandingPage && !isPublicFile) {
    if (!user && !isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";

      return NextResponse.redirect(url);
    }

    if (user && isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/";

      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
