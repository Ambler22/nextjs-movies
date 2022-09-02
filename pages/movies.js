import React, { useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import { getRequiredServerEnvVar } from "../utils/misc"
import { PrismaClient } from "@prisma/client"
import { TOKEN_COOKIE_NAME } from "../utils/auth"

// [[{ name: 'django' }], true, () => { fetch() }, () => { inputRef.focus() }, { current: HTMLDivElement }}, ]

export default function Movies() {
  const [moviesPage, setMoviesPage] = useState()
  const [offset, setOffset] = useState(0)

  const limit = 10
  const countPages = moviesPage ? Math.ceil(moviesPage.count / limit) : 0

  console.log(offset)
  useEffect(() => {
    fetch(`/api/movies?limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(data => setMoviesPage(data))
  }, [offset])

  return (
    <>
      <div className="grid grid-cols-3">
        {moviesPage?.results.map(movie => {
          return (
            <div key={movie.id}>
              <img
                style={{ width: 250, height: 150 }}
                src={`https://api.nomoreparties.co${movie.imageUrl}`}
                alt=""
              />
              <h2>{movie.nameRU}</h2>
            </div>
          )
        })}
      </div>

      <Pagination
        countPages={countPages}
        offset={offset}
        limit={limit}
        setOffset={setOffset}
      />
    </>
  )
}

const Pagination = props => {
  return (
    <>
      {Array.from({ length: props.countPages }, (_, i) => {
        return (
          <button
            style={{
              fontWeight: i * props.limit === props.offset ? "bold" : undefined,
            }}
            key={i}
            onClick={() => props.setOffset(i * props.limit)}
          >
            {i + 1}
          </button>
        )
      })}
      <button
        disabled={props.offset === 0}
        onClick={() => props.setOffset(props.offset - props.limit)}
      >
        Prev
      </button>
      <button
        disabled={props.offset === (props.countPages - 1) * props.limit}
        onClick={() => props.setOffset(props.offset + props.limit)}
      >
        Next
      </button>
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
