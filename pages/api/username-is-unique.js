import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { username } = req.query

  if (req.method !== "GET") {
    res.status(405).send()
    return
  }

  if (typeof username !== "string") {
    res.status(400).json({ username: "invalid value, expected a string" })
    return
  }

  if (username === "") {
    res.status(400).json({ username: "this field is required" })
    return
  }

  const userCount = await prisma.user.count({ where: { username } })
  res.status(200).json({ username: userCount === 0 })
}

// URL BREAKDOWN
// 0. https://stackoverflow.com/questions/45324234234?lang=en&q=python#27 - url
// 1. https - protocol
// 2. stackoverflow - domain
// 3. com - top level domain
// 4. stackoverflow.com - host / ip - address
// 5. 127.0.0.1 - ip address
// 6. 3000 - port
// 7. /questions/45324234234?lang=en&q=python#27 - path/pathname
// 8. lang = en & q=python - query / query parameters / get parameters / parameters
// 9. 27 - hash
