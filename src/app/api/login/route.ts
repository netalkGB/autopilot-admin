import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { getSession } from '@/utils/session/IronSessionUtil'
import randomstring from 'randomstring'
import crypto from 'crypto'

export async function GET (): Promise<NextResponse<{ message: string }>> {
  const session = await getSession()

  // FIXME: It seems better to also check if the token is valid.
  const isLoggedIn = session.tokens?.token !== undefined && session.tokens?.idToken !== undefined
  if (isLoggedIn) {
    return NextResponse.json({ message: 'Already logged in.' })
  }

  const clientId = process.env.AP_CLIENT_ID ?? ''
  const state = randomstring.generate(10)
  const codeVerifier = randomstring.generate(80)
  const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64').replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '')
  session.oAuth2Temp = {
    state,
    codeVerifier
  }
  await session.save()
  const redirectUrl = await generateAuthorizationRequestUrl(clientId, state, codeChallenge)
  redirect(redirectUrl)
}

async function generateAuthorizationRequestUrl (clientId: string, state: string, codeChallenge: string): Promise<string> {
  const params = new URLSearchParams()
  params.append('response_type', 'code')
  params.append('client_id', clientId)
  params.append('redirect_uri', process.env.AP_REDIRECT_URI ?? '')
  params.append('scope', 'r w openid')
  params.append('state', state)
  params.append('code_challenge_method', 's256')
  params.append('code_challenge', codeChallenge)
  return `${process.env.AP_SERVER_URI}authorize?${params.toString()}`
}
