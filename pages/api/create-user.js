import {
  EMAIL_REGEX,
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../../utils/validation"
import bcrypt from "bcryptjs/dist/bcrypt"
import { ERROR_MESSAGES } from "../../utils/validation"
import prisma from "../../utils/db"

export default async function handler(req, res) {
  const { username, email, password } = req.body

  const errors = {}

  if (typeof username !== "string") {
    errors.username = ERROR_MESSAGES.required
  } else if (username.length === 0) {
    errors.username = ERROR_MESSAGES.blank
  } else if (username.length < 3) {
    errors.username = `This username is too short. It must containt at least ${USERNAME_MIN_LENGTH} characters`
  } else if ((await prisma.user.count({ where: { username } })) > 0) {
    errors.username = "This username is not unique"
  }

  if (typeof email !== "string") {
    errors.email = ERROR_MESSAGES.required
  } else if (email.length === 0) {
    errors.email = ERROR_MESSAGES.blank
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "This email is invalid"
  } else if ((await prisma.user.count({ where: { email } })) > 0) {
    errors.email = "This email is not unique"
  }

  if (typeof password !== "string") {
    errors.password = ERROR_MESSAGES.required
  } else if (password.length === 0) {
    errors.password = ERROR_MESSAGES.blank
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.passwrod = `This password is too short. It must contain at least ${PASSWORD_MIN_LENGTH} characters`
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json(errors)
    return
  }

  await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: bcrypt.hashSync(password),
    },
  })

  res.status(201).send({})
}
