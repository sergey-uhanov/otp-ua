import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { session } from '@/interfaces/auth.interface';

const routesForAllUsers = ['/contact', '/create-page', '/ready-tests']; // Доступ для всех авторизованных пользователей
const routesForAdminsOnly = ['/dashboard']; // Доступ только для администраторов

export default async function middleware(request: NextRequest) {
  const session: session | null = await auth();

  const absoluteURL = new URL('/', request.nextUrl.origin);
  const pathname = request.nextUrl.pathname;

  if (!session) {
    const allProtectedRoutes = [...routesForAllUsers, ...routesForAdminsOnly];
    const isProtected = allProtectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtected) {
      return NextResponse.redirect(new URL('/error', request.url));
    }

    return NextResponse.next();
  } else {
    const user = session.user;

    if (!user) {
      return NextResponse.redirect(new URL('/error', request.url));
    }

    const role = user.role;
    const isUserRoute = routesForAllUsers.some((route) =>
      pathname.startsWith(route)
    );

    const isAdminRoute = routesForAdminsOnly.some((route) =>
      pathname.startsWith(route)
    );

    if (isAdminRoute && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/error', request.url));
    }

    if (!isUserRoute && !isAdminRoute) {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
