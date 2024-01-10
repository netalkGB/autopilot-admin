import {redirect} from "next/navigation";
import {NextResponse} from "next/server";
import {IronSessionUtil} from "@/utils/session/IronSessionUtil";
import SessionInfo from "@/utils/session/SessionInfo";
import {IronSession} from "iron-session";
import jose from 'jsrsasign';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const clearOAuth2Temp = async (session: IronSession<SessionInfo>) => {
    session.oAuth2Temp = undefined;
    await session.save();
  }

  if (!code || !state) {
    await clearOAuth2Temp(await IronSessionUtil.getIronSession());
    return NextResponse.json({ message: 'error.' }); // FIXME: It would be better to go to the error screen.
  }

  const session = await IronSessionUtil.getIronSession();
  if (!session.oAuth2Temp?.codeVerifier) {
    await clearOAuth2Temp(await IronSessionUtil.getIronSession());
    return NextResponse.json({ message: 'error.' }); // FIXME: It would be better to go to the error screen.
  }

  if(state !== session.oAuth2Temp?.state){
    await clearOAuth2Temp(await IronSessionUtil.getIronSession());
    return NextResponse.json({ message: 'error.' }); // FIXME: It would be better to go to the error screen
  }

  const clientId = process.env.AP_CLIENT_ID
  const clientSecret = process.env.AP_CLIENT_SECRET
  const token = await accessTokenRequest(clientId, clientSecret, code, session.oAuth2Temp.codeVerifier)
  session.tokens = {
    token: {
      tokenType: token['token_type'],
      expiresIn: token['expires_in'],
      accessToken: token['access_token'],
      scope: token['scope'],
      refreshToken: token['refresh_token']
    }
  };


  // id token
  const clientRsaKey = JSON.parse(process.env.AP_CLIENT_RSA_KEY_JSON);

  let idToken
  const publicKey = jose.KEYUTIL.getKey(clientRsaKey)
  const parts = token['id_token'].split('.')
  const b64UrlToB64 = b64Url => b64Url.replace(/_/g, '/').replace(/-/g, '+')
  const payload = JSON.parse(Buffer.from(b64UrlToB64(parts[1]), 'base64').toString())
  if (jose.jws.JWS.verify(token['id_token'], publicKey, [clientRsaKey.alg])) { // FIXME: must fix type error.
    if (payload.iss === process.env.AP_SERVER_URI) {
      if (payload.aud === clientId || payload?.aud?.includes(clientId)) {
        const now = Math.floor(Date.now() / 1000)
        if (payload.iat <= now && payload.exp >= now) {
          console.log("token valid")
          idToken = payload
        }
      }
    }
  }
  session.tokens.idToken = {
    iss: idToken.iss,
    sub: idToken.sub,
    aud: idToken.aud,
    iat: idToken.iat,
    exp: idToken.exp
  }
  // id token


  await clearOAuth2Temp(await IronSessionUtil.getIronSession());
  await session.save();
  redirect('/');
}

async function accessTokenRequest(clientId: string, clientSecret: string, code: string, codeVerifier: string) {
  const headers = {
    'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };
  const params = new URLSearchParams()
  params.append('code', code)
  params.append('grant_type', 'authorization_code')
  // params.append('client_id', clientId)
  // params.append('client_secret', clientSecret)
  params.append('redirect_uri', process.env.AP_REDIRECT_URI)
  params.append('code_verifier', codeVerifier)
  const response = await fetch(`${process.env.AP_SERVER_URI}token`, {
    method: 'POST',
    headers,
    body: params
  })
  return await response.json()
}