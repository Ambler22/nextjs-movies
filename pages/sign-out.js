import { serialize } from "cookie"
import { TOKEN_COOKIE_NAME } from "../utils/auth"

export default function SignOut() {
  return null
}

export async function getServerSideProps({ res }) {
  res.setHeader("Set-Cookie", serialize(TOKEN_COOKIE_NAME, "", { maxAge: 0 }))

  return {
    redirect: { destination: "/sign-in" },
  }
}
