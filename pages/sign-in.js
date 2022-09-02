import { useRouter } from "next/router"
import React, { useState } from "react"
import ErrorMessage from "../components/ErrorMessage"

{
  /* <App>
  <SignIn setUser={setUser}>
  </SignIn>
</App> */
}

// setUser(user)

export default function SignIn({ setUser }) {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [usernameBlurred, setUsernameBlurred] = useState(false)
  const [passwordBlurred, setPasswordBlurred] = useState(false)

  const usernameIsInvalid = username.length < 1
  const passwordIsInvalid = password.length < 1

  async function handleSubmit(event) {
    event.preventDefault()
    const response = await fetch("api/sign-in", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
    // .then(res => res.json())
    // .then(user => console.log(user))
    const user = await response.json()
    console.log(user)
    setUser(user)
    router.push("/movies")
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <label>
        Введите Имя или E-mail
        <input
          type={"text"}
          onChange={e => setUsername(e.target.value)}
          onBlur={() => setUsernameBlurred(true)}
        />
      </label>
      {usernameBlurred && usernameIsInvalid && (
        <ErrorMessage text={"This field is required"} />
      )}
      <label>
        Введите пароль
        <input
          type={"password"}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => setPasswordBlurred(true)}
        />
      </label>
      {passwordBlurred && passwordIsInvalid && (
        <ErrorMessage text={"This field is required"} />
      )}
      <button disabled={usernameIsInvalid || passwordIsInvalid} type="submit">
        Войти
      </button>
    </form>
  )
}
