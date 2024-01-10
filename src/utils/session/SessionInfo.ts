type SessionInfo = {
  tokens?: {
    token?: {
      tokenType: string,
      expiresIn: number,
      accessToken: string,
      scope: string,
      refreshToken: string
    },
    idToken?: {
      iss: string,
      sub: string,
      aud: string,
      iat: number,
      exp: number
    }
  }
};

export default SessionInfo;
