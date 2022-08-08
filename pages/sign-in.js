import React, { useState } from "react"
import ErrorMessage, { getMinLengthErrorText } from "../components/ErrorMessage"

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [usernameBlurred, setUsernameBlurred] = useState(false)
  const [passwordBlurred, setPasswordBlurred] = useState(false)

  const usernameIsInvalid = username.length < 1
  const passwordIsInvalid = password.length < 1

  return (
    <form style={{ display: "flex", flexDirection: "column" }} noValidate>
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
