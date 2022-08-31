import Link from "next/link"
import ErrorMessage, { getMinLengthErrorText } from "../components/ErrorMessage"

import React, { useState } from "react"
import Router, { useRouter } from "next/router"

export default function SignUp() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [usernameBlurred, setUsernameBlurred] = useState(false)
  const [emailBlurred, setEmailBlurred] = useState(false)
  const [passwordBlurred, setPasswordBlurred] = useState(false)

  const usernameIsInvalid = username.length < 2
  const emailIsInvalid = !emailRegex.test(email)
  const passwordIsInvalid = password.length < 6

  async function handleSubmit(event) {
    event.preventDefault()
    const response = await fetch("api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
    if (response.ok) {
      router.push("/sign-in")
    } else {
      // handle api validation errors...
    }
  }

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        noValidate
        onSubmit={handleSubmit}
      >
        <label style={{ display: "flex", flexDirection: "column" }}>
          Имя
          <input
            type="text"
            onChange={e => setUsername(e.target.value)}
            onBlur={() => setUsernameBlurred(true)}
          />
          {usernameBlurred && usernameIsInvalid && (
            <ErrorMessage text={getMinLengthErrorText(2, username.length)} />
          )}
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          E-mail
          <input
            type="email"
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setEmailBlurred(true)}
          />
          {emailBlurred && emailIsInvalid && (
            <ErrorMessage
              text={"Пожалуйста, введите адрес электронной почты."}
            />
          )}
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          Пароль
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            onBlur={() => setPasswordBlurred(true)}
          />
          {passwordBlurred && passwordIsInvalid && (
            <ErrorMessage text={getMinLengthErrorText(6, password.length)} />
          )}
        </label>
        <button
          style={{ maxWidth: 260 }}
          type="submit"
          disabled={usernameIsInvalid || passwordIsInvalid || emailIsInvalid}
        >
          Зарегистрироваться
        </button>
      </form>
      <p>
        Уже зарегистрированы? <Link href="/sign-in">Войти</Link>
      </p>
    </>
  )
}

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
