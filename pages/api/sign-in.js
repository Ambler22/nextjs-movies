import { ERROR_MESSAGES } from "../../utils/validation"
import bcrypt from "bcryptjs"
// import nookies from 'nookies'
import { serialize } from "cookie"
import jwt from "jsonwebtoken"
import { getRequiredServerEnvVar } from "../../utils/misc"
import { TOKEN_COOKIE_NAME } from "../../utils/auth"
import prisma from "../../utils/db"

export default async function handler(req, res) {
  // req {
  //   query: '',
  //   method: '',
  //   params: '',
  //   cookies: '',
  //   body: {
  //     { username: 'Alice', password: '1234566' }
  // }

  const { username, password } = req.body //

  const errors = {}

  if (typeof username !== "string") {
    errors.username = ERROR_MESSAGES.required
  }

  if (typeof password !== "string") {
    errors.password = ERROR_MESSAGES.required
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json(errors)
    return
  }

  const user = await prisma.user.findFirst({
    where: { OR: [{ username }, { email: username }] },
  })

  if (user === null) {
    res
      .status(401)
      .json({ message: "No active account found with the given credentials" })
    return
  }

  const passwordMatches = bcrypt.compareSync(password, user.password)
  if (!passwordMatches) {
    res.status(401).json({
      message: "No active account found with the given credentials",
    })
    return
  }

  delete user.password

  res.setHeader(
    "Set-Cookie",
    serialize(
      TOKEN_COOKIE_NAME,
      jwt.sign({ id: user.id }, getRequiredServerEnvVar("JWT_SECRET")),
      {
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        path: "/",
      }
    )
  )
  res.status(200).send(user)
}
