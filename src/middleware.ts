import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/utils/session/IronSessionUtil'

export async function middleware (req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/api/autopilot/')) {
    const session = await getSession()
    if (session.tokens?.token?.accessToken === undefined || session.tokens?.idToken === undefined) {
      return NextResponse.next({
        status: 401
      })
    }

    const headers = new Headers(req.headers)
    headers.set('Authorization', `Bearer ${session.tokens?.token?.accessToken}`)
    return NextResponse.next({
      request: {
        headers
      }
    })
  }
  return NextResponse.next()
}
