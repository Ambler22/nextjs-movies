import Link from "next/link"
import { useRouter } from "next/router"

import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const showAuthLinks =
    router.pathname !== "/sign-in" && router.pathname !== "/sign-up"
  return (
    <>
      <header>
        <nav>
          <Link href="/">Главная</Link>
          {showAuthLinks && (
            <div>
              <Link href="sign-up">Регистрация</Link>
              <Link href="sign-in">Войти</Link>
            </div>
          )}
        </nav>
      </header>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
