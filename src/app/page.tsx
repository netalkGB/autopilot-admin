import { getSession } from '@/utils/session/IronSessionUtil'

// @ts-expect-error-next-line
export default async function Home (): Promise<React.ReactNode> {
  const session = await getSession()
  const tokens = session.tokens

  return (
    <div>
      <h1>
        test
      </h1>
      <h2>
        session
      </h2>
      <div>
        token: {JSON.stringify(tokens?.token)}
      </div>
      <div>
        id token: {JSON.stringify(tokens?.idToken)}
      </div>
    </div>
  )
}
