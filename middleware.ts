import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const publicPaths = [
    '/login',
    '/api/login',
    '/favicon.ico',
  ]

  const isPublic =
    publicPaths.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith('/_next')

  if (isPublic) {
    return NextResponse.next()
  }

  const auth = req.cookies.get('crm_auth')?.value

  if (auth !== 'ok') {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}