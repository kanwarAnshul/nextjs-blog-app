import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwtDecode from 'jwt-decode';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = ['/', '/user-login', '/user-signup', '/admin-login', '/admin-signup'].includes(path)

  const token = request.cookies.get('token')?.value
  const role = request.cookies.get('role')?.value

  if (token) {
    try {
      console.log('Token:', token);
      // const decodedPayload: any = jwtDecode(token);
      // role = decodedPayload?.role; // Extract role
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }


  console.log('Middleware Check:', { token, role, path })

  // ✅ Allow public routes if no token
  if (!token) {
    if (isPublicPath) {
      return NextResponse.next() // Allow access
    }
    // Redirect to login if trying to access protected routes
    return NextResponse.redirect(new URL('/', request.url))
  } else {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin-home', request.url))
    } else {
      return NextResponse.redirect(new URL('/user-home', request.url))
    }
  }

  // ✅ Redirect authenticated users based on role
  if (role === 'admin' && path.startsWith('/user-home')) {
    return NextResponse.redirect(new URL('/admin-home', request.url))
  }
  if (role === 'user' && path.startsWith('/admin-home')) {
    return NextResponse.redirect(new URL('/user-home', request.url))
  }

  return NextResponse.next() // Proceed normally
}

export const config = {
  matcher: [
    '/',
    '/user-login',
    '/user-signup',
    '/admin-login',
    '/admin-signup',
    '/admin-home/:path*',
    '/user-home/:path*',
  ],
}
