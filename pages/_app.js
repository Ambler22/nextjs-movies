import React from "react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"

import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(pageProps.user ?? null)

  const router = useRouter()
  const showAuthLinks =
    router.pathname !== "/sign-in" && router.pathname !== "/sign-up"

  return (
    <>
      <header>
        <nav className="flex justify-center items-center gap-10 text-xl mb-5">
          <Link href="/">Главная</Link>
          {showAuthLinks &&
            (user ? (
              <>
                <Link href="/movies">Фильмы</Link>
                <Link href="/saved-movies">Сохраненные фильмы</Link>
                <Link href="/profile">{user.email}</Link>
              </>
            ) : (
              <>
                <Link href="/sign-up">Регистрация</Link>
                <Link href="/sign-in">Войти</Link>
              </>
            ))}
        </nav>
      </header>
      <Component {...pageProps} setUser={setUser} />
    </>
  )
}

export default MyApp
