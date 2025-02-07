import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function authMiddleware(request: NextRequest) {
  // Apenas permite o fluxo sem redirecionamentos
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // Aplica o middleware a todas as rotas
};