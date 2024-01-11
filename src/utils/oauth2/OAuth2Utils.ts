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
