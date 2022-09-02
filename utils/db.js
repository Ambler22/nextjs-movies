import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  // log: [
  //   {
  //     emit: "event",
  //     level: "query",
  //   },
  //   "info",
  //   "warn",
  //   "error",
  // ],
})

prisma.$on("query", e => {
  console.log("Query: ", e.query)
  console.log("Params: ", e.params)
})

export default prisma
