import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import axios from "axios"

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: {
      username: "john",
    },
    create: {
      username: "john",
      email: "john@gmail.com",
      password: bcrypt.hashSync(getRequiredServerEnvVar("USER_PASSWORD")),
    },
    update: {},
  })
  createMovies()
}

async function createMovies() {
  const response = await axios.get(
    "https://api.nomoreparties.co/beatfilm-movies"
  )

  for (const movie of response.data) {
    await prisma.movie.upsert({
      where: {
        id: movie.id,
      },
      create: {
        id: movie.id,
        nameRU: movie.nameRU,
        duration: movie.duration,
        country: movie.country,
        description: movie.description,
        director: movie.director,
        year: movie.year,
        trailerLink: movie.trailerLink,
        imageUrl: movie.image.url,
      },
      update: {},
    })
  }
}

main()

export function getRequiredServerEnvVar(key) {
  const value = process.env[key]
  if (!value) {
    throw new Error(`${key} env variable must be set`)
  }
  return value
}
