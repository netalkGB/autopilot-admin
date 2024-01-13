import type SessionInfo from '@/utils/session/SessionInfo'
import { type IronSession } from 'iron-session'

export function createAccessTokenHeader (): RequestInit['headers'] {
  return {
    Authorization: `Basic ${Buffer.from(`${process.env.AP_CLIENT_ID}:${process.env.AP_CLIENT_SECRET}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
}

export function createBearerTokenHeader (accessToken: string): RequestInit['headers'] {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
}

export async function updateAccessToken (session: IronSession<SessionInfo>): Promise<void> {
  const refreshToken = session.tokens?.token?.refreshToken ?? ''

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'refresh_token')
  urlencoded.append('refresh_token', refreshToken)
  const refreshTokenRes = await fetch(`${process.env.AP_SERVER_URI}token`, {
    method: 'POST',
    headers: createAccessTokenHeader(),
    body: urlencoded,
    redirect: 'follow'
  })
  if (refreshTokenRes.status === 200) {
    const refreshTokenJson = await refreshTokenRes.json()
    if (session.tokens?.token === undefined) {
      return
    }
    session.tokens.token.tokenType = refreshTokenJson.token_type
    session.tokens.token.expiresIn = refreshTokenJson.expires_in
    session.tokens.token.accessToken = refreshTokenJson.access_token
    session.tokens.token.scope = refreshTokenJson.scope
    session.tokens.token.refreshToken = refreshTokenJson.refresh_token
  }
}
