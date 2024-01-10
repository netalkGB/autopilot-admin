import {IronSessionUtil} from "@/utils/session/IronSessionUtil";

export default async function Home() {
  const session = await IronSessionUtil.getIronSession();
  const tokens = await session.tokens;

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
