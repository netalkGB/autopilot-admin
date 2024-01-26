import { NextResponse } from 'next/server'
import { getSession } from '@/utils/session/IronSessionUtil'
import { revokeAccessToken } from '@/utils/oauth2/OAuth2Utils'

export async function POST (): Promise<NextResponse> {
  const session = await getSession()
  if (session.tokens?.token?.accessToken === undefined || session.tokens?.idToken === undefined) {
    return NextResponse.json({ message: 'ok' }, { status: 200 })
  }
  await revokeAccessToken(session)
  session.tokens.idToken = undefined
  await session.save()
  return NextResponse.json({ message: 'ok' }, { status: 200 })
}
