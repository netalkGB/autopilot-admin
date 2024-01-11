interface SessionInfo {
  tokens?: {
    token?: {
      tokenType: string
      expiresIn: number
      accessToken: string
      scope: string
      refreshToken: string
    }
    idToken?: {
      iss: string
      sub: string
      aud: string
      iat: number
      exp: number
    }
  }
  oAuth2Temp?: {
    state: string
    codeVerifier: string
  }
}

export default SessionInfo
