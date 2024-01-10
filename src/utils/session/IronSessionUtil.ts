import {getIronSession, IronSession} from 'iron-session';
import SessionInfo from "./SessionInfo";
import {cookies} from "next/headers";

export class IronSessionUtil {
  private constructor() {}

  static async getIronSession(): Promise<IronSession<SessionInfo>> {
    return new SessionHelper("ap-session", process.env.SESSION_PASSWORD, cookies).getSession();
  }
}

class SessionHelper {
  private readonly password: string;
  private readonly cookieName: string;
  private readonly cookies: Function;
  constructor(cookieName: string, password: string, cookies: Function) {
    this.cookieName = cookieName;
    this.password = password;
    this.cookies = cookies;
  }

  async getSession(): Promise<IronSession<SessionInfo>> {
    return await getIronSession<SessionInfo>(this.cookies(), {cookieName: this.cookieName, password: this.password});
  }
}