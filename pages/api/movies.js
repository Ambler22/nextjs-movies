import prisma from "../../utils/db"

export default async function handler(req, res) {
  let offset = Number(req.query.offset)
  let limit = Number(req.query.limit)

  if (Number.isNaN(offset) || offset < 0) {
    offset = 0
  }

  if (Number.isNaN(limit) || limit < 0) {
    limit = 50
  }

  const [movies, totalMoviesCount] = await Promise.all([
    prisma.movie.findMany({ take: limit, skip: offset }),
    prisma.movie.count(),
  ])

  res.status(200).send({ count: totalMoviesCount, results: movies })
}
