import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/utils/session/IronSessionUtil'

export async function middleware (req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/api/autopilot/')) {
    const session = await getSession()
    const nextResponse = NextResponse.next()
    nextResponse.headers.set('Authorization', `Bearer ${session.tokens?.token?.accessToken}`)
    return nextResponse
  }

  return NextResponse.next()
}
