// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export default function authMiddleware(request: NextRequest) {
//   // Apenas permite o fluxo sem redirecionamentos
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/:path*"], // Aplica o middleware a todas as rotas
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthCookie } from "./helpers/cookies/authCookie";

export default function authMiddleware(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const cookie = request.cookies.get("pms_data_user")?.value;
    const slug = request.cookies.get("pms_slug")?.value;
    const property = request.cookies.get("pms_ppt")?.value;
    const cookieParsed = cookie && JSON.parse(cookie);

    // Prevent infinite redirect loop
    if (pathname) {
      return NextResponse.next();
    }

    if (!cookieParsed || !slug || !property) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  matcher: ["/:path*"],
};