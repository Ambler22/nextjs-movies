/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from "react"
import jwt from "jsonwebtoken"
import { getRequiredServerEnvVar } from "../utils/misc"
import { PrismaClient } from "@prisma/client"
import { TOKEN_COOKIE_NAME } from "../utils/auth"

// [[{ name: 'django' }], true, () => { fetch() }, () => { inputRef.focus() }, { current: HTMLDivElement }}, ]

//

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [offset, setOffset] = useState(0)
  const [errorServer, setErrorServer] = useState("")
  const hasNextPageRef = useRef(false)

  const limit = 21
  // const countPages = moviesPages.length !== 0 ? Math.ceil(movesPage.count / limit) : 0

  useEffect(() => {
    fetch(`/api/movies?limit=${limit}&offset=${offset}`)
      .then(res => {
        return res.json().then(data => ({ res, data }))
      })
      .then(({ res, data }) => {
        if (!res.ok) {
          setErrorServer(data.message)
        } else {
          console.log(data)
          const page = data
          const newMovies = movies.concat(page.results)
          setMovies(newMovies)
          hasNextPageRef.current = newMovies.length < data.count
        }
      })
  }, [offset])

  useEffect(() => {
    function handleScroll() {
      const MAC_OS_SPECIFIC_OFFSET_PX = 2
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - MAC_OS_SPECIFIC_OFFSET_PX &&
        hasNextPageRef.current
      ) {
        setOffset(prevOffset => prevOffset + limit)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4">
        {errorServer ? (
          <h1>{errorServer}</h1>
        ) : movies.length === 0 ? (
          Array.from({ length: limit }, (_, i) => {
            return (
              <div className="w-[250px] h-[150px] bg-gray-500" key={i}></div>
            )
          })
        ) : (
          <>
            {movies.map(movie => {
              return (
                <div key={movie.id}>
                  <img
                    width={250}
                    height={150}
                    style={{ width: 250, height: 150 }}
                    src={`https://api.nomoreparties.co${movie.imageUrl}`}
                    alt=""
                  />
                  <h2>{movie.nameRU}</h2>
                </div>
              )
            })}
            {}
          </>
        )}
      </div>
      {/* {moviesPage !== null && (
        <Pagination
          countPages={countPages}
          offset={offset}
          limit={limit}
          setOffset={setOffset}
        />
      )} */}
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
