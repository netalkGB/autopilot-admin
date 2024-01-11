import { getSession } from '@/utils/session/IronSessionUtil'

export default async function Home (): Promise<React.ReactNode> {
  const session = await getSession()
  const tokens = session.tokens

  return (
    <div>
      <h1>
        login test
      </h1>
      <div>
        token: {JSON.stringify(tokens?.token)}
      </div>
      <div>
        id token: {JSON.stringify(tokens?.idToken)}
      </div>
    </div>
  )
}
