import { getSession } from '@/utils/session/IronSessionUtil'
import { updateAccessToken } from '@/utils/oauth2/OAuth2Utils'
import { NextResponse } from 'next/server'

export async function POST (): Promise<NextResponse> {
  const session = await getSession()
  if (session.tokens?.token?.accessToken === undefined || session.tokens?.idToken === undefined) {
    return NextResponse.json({ message: 'error' }, {
      status: 401
    })
  }
  await updateAccessToken(session)
  await session.save()
  return NextResponse.json({ message: 'ok' }, { status: 200 })
}
