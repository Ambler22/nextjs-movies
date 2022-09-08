import React from "react"
import Link from "next/link"

export default function Profile() {
  return (
    <div className="flex justify-center items-center text-xl gap-8 min-h-[80px]">
      Profile
      <Link href="/sign-out">Log out</Link>
      <div className="min-h-[1500px]"></div>
    </div>
  )
}
