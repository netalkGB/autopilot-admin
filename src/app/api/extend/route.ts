import { getSession } from '@/utils/session/IronSessionUtil'
import { updateAccessToken } from '@/utils/oauth2/OAuth2Utils'
import { NextResponse } from 'next/server'

export async function POST (): Promise<NextResponse> {
  const session = await getSession()
  await updateAccessToken(session)
  await session.save()
  return NextResponse.json({ message: 'ok' }, { status: 200 })
}
