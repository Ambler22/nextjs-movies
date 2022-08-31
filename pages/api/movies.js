import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { offset = 0, limit = 15 } = req.query
  const movies = await prisma.movie.findMany({ take: limit, skip: offset })
  res.status(200).send(movies)
}
