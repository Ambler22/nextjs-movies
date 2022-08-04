import Link from "next/link"

import React, { useState } from "react"

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const userameIsInvalid = username.length < 2
  const emailIsInvalid = !emailRegex.test(email)
  const passwordIsInvalid = password.length < 6

  function ErrorMessage({ text }) {
    return (
      <span style={{ color: "red" }} role="alert">
        {text}
      </span>
    )
  }

  return (
    <>
      <form style={{ display: "flex", flexDirection: "column" }} noValidate>
        <label style={{ display: "flex", flexDirection: "column" }}>
          Имя
          <input type="text" onChange={e => setUsername(e.target.value)} />
          {userameIsInvalid && (
            <ErrorMessage
              text={`
                    Пожалуйста, используйте не менее 2 символов (сейчас вы
                    используете ${username.length}
                    символов).
                  `}
            />
          )}
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          E-mail
          <input type="email" onChange={e => setEmail(e.target.value)} />
          {emailIsInvalid && (
            <ErrorMessage
              text={"Пожалуйста, введите адрес электронной почты."}
            />
          )}
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          Пароль
          <input type="password" onChange={e => setPassword(e.target.value)} />
          {passwordIsInvalid && (
            <ErrorMessage
              text={`Пожалуйста, используйте не менее 6 символов (сейчас вы используете
              ${password.length}
              символов).`}
            />
          )}
        </label>
        <button
          style={{ maxWidth: 260 }}
          type="submit"
          disabled={userameIsInvalid || passwordIsInvalid || emailIsInvalid}
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
