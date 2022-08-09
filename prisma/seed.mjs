import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

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
}

main()

function getRequiredServerEnvVar(key) {
  const value = process.env[key]
  if (!value) {
    throw new Error(`${key} env variable must be set`)
  }
  return value
}
