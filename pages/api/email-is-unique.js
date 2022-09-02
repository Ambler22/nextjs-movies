import prisma from "../../utils/db"

export default async function handler(req, res) {
  const { email } = req.query

  if (req.method !== "GET") {
    res.status(405).send()
    return
  }

  if (typeof email !== "string") {
    res.status(400).json({ email: "invalid value, expected a string" })
    return
  }

  if (email === "") {
    res.status(400).json({ email: "this field is required" })
    return
  }

  const userCount = await prisma.user.count({ where: { email } })
  res.status(200).json({ email: userCount === 0 })
}
