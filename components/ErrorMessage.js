import React from "react"

export function getMinLengthErrorText(minLength, currentLength) {
  return `Пожалуйста, используйте не менее ${minLength} символа (сейчас вы используете ${currentLength} символов).`
}

export default function ErrorMessage({ text }) {
  return (
    <span style={{ color: "red" }} role="alert">
      {text}
    </span>
  )
}
