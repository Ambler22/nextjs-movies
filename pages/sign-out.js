import React from "react"
import { serialize } from "cookie"
import { TOKEN_COOKIE_NAME } from "../utils/auth"

export default function SignOut() {
  return null
}

export async function getServerSideProps({ req, res }) {
  res.setHeader("Set-Cookie", serialize(TOKEN_COOKIE_NAME, "", { maxAge: 0 }))

  return {
    redirect: { destination: "/sign-in" },
  }
}
