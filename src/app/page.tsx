"use client"

import { Loading } from "@/components/Loading/Loading"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { delay } from "@/helpers/delay"

export default function Page() {
  const router = useRouter()
  const [property] = useState("hotel-ao")

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const cookie = Cookies.get("pms_token")
      await delay(2000)
      if (cookie && property) {
        router.push(`/${property}/home`)
      } else {
        router.push("/login")
      }
    }

    checkAuthAndRedirect()
  }, [property, router])

  return (
    <main className="flex h-screen items-center justify-center p-24">
      <Loading className="border-primary" />
    </main>
  )
}