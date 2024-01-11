import { getIronSession, type IronSession } from 'iron-session'
import type SessionInfo from './SessionInfo'
import { cookies } from 'next/headers'

export async function getSession (): Promise<IronSession<SessionInfo>> {
  return await new SessionHelper('ap-session', process.env.SESSION_PASSWORD, cookies()).getSession()
}

class SessionHelper {
  private readonly password: string
  private readonly cookieName: string
  private readonly cookies: any // Type error occurs, but the solution is unclear, so using 'any' as a temporary workaround.
  constructor (cookieName: string, password: string, cookies: any) { // Type error occurs, but the solution is unclear, so using 'any' as a temporary workaround.
    this.cookieName = cookieName
    this.password = password
    this.cookies = cookies
  }

  async getSession (): Promise<IronSession<SessionInfo>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await getIronSession<SessionInfo>(this.cookies, { cookieName: this.cookieName, password: this.password })
  }
}
