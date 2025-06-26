import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/admin']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoutes = protectedRoutes.includes(path)
  const sessionCookie = getSessionCookie(request)

  if (isProtectedRoutes && !sessionCookie) {
    const redirectUrl = new URL('/sign-in', request.nextUrl)
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
