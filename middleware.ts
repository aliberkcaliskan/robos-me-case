import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ROUTES } from './constants/routes';

const AuthRoutes: string[] = [
  ROUTES.DETAIL,
  ROUTES.LIST,
];

const UnAuthRoutes: string[] = [
  ROUTES.LOGIN,
];

// Middleware fonksiyonu
export function middleware (request: NextRequest) {
  // Çerezleri request headers'dan al
  const cookies = request.cookies;
  const pathName = request.nextUrl.pathname;
  const email = cookies.get('email')?.value;

  // Kullanıcı giriş yapmadıysa ve yetkilendirilmiş rotaya erişmeye çalışıyorsa
  if (!email && AuthRoutes.includes(pathName)) {
    const loginURL = new URL(ROUTES.LOGIN, request.nextUrl.origin);
    return NextResponse.redirect(loginURL.toString());
  }

  // Kullanıcı giriş yaptıysa ve yetkilendirilmemiş (login gibi) rotaya erişmeye çalışıyorsa
  if (email && UnAuthRoutes.includes(pathName)) {
    const listURL = new URL(ROUTES.LIST, request.nextUrl.origin);
    return NextResponse.redirect(listURL.toString());
  }

  return NextResponse.next();
}
