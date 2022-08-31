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
        <nav>
          <Link href="/">Главная</Link>
          {showAuthLinks &&
            (user ? (
              <>
                <div>
                  <Link href="/movies">Фильмы</Link>
                  <Link href="/saved-movies">Сохраненные фильмы</Link>
                </div>
                <Link href="/profile">{user.email}</Link>
              </>
            ) : (
              <div>
                <Link href="/sign-up">Регистрация</Link>
                <Link href="/sign-in">Войти</Link>
              </div>
            ))}
        </nav>
      </header>
      <Component {...pageProps} setUser={setUser} />
    </>
  )
}

export default MyApp
