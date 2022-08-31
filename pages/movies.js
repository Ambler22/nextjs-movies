import React, { useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import { getRequiredServerEnvVar } from "../utils/misc"
import { PrismaClient } from "@prisma/client"
import { TOKEN_COOKIE_NAME } from "../utils/auth"

// [[{ name: 'django' }], true, () => { fetch() }, () => { inputRef.focus() }, { current: HTMLDivElement }}, ]

export default function Movies({ user }) {
  const [movies, setMovies] = useState([])

  const moviesUrl = "https://api.nomoreparties.co"

  useEffect(() => {
    fetch("/api/movies")
      .then(res => res.json())
      .then(movies => setMovies(movies))
  }, [])

  return (
    <>
      {movies.map(item => {
        return (
          <div key={item.id}>
            <img
              style={{ width: 250, height: 150 }}
              src={`${moviesUrl}${item.imageUrl}`}
              alt=""
            />
            <h2>{item.nameRU}</h2>
          </div>
        )
      })}
    </>
  )
}

export async function getServerSideProps({ req }) {
  const prisma = new PrismaClient()
  const token = req.cookies[TOKEN_COOKIE_NAME]

  if (token === undefined) {
    return {
      redirect: {
        destination: "/sign-in",
      },
    }
  }

  const { id } = jwt.decode(token, getRequiredServerEnvVar("JWT_SECRET"))

  if (id === undefined) {
    return {
      redirect: {
        destination: "/sign-in",
      },
    }
  }

  const user = await prisma.user.findUnique({ where: { id } })

  if (user === null) {
    return {
      redirect: {
        destination: "/sign-in",
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}
