import React from "react"
import Link from "next/link"

export default function Profile() {
  return (
    <div>
      Profile
      <Link href="/sign-out">Log out</Link>
    </div>
  )
}
