/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Loading } from "@/components/Loading/Loading";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { delay } from "@/helpers/delay";

export default function page() {

  const router = useRouter()
  const [property] = useState("hotel-ao");

  useEffect(() => {
      (async function () {
      const cookie = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME}`)
      await delay(2000);
      if (cookie && property) {
        router.push(`/${property}/home`);
      } else {
        router.push('/login')
      }
    })()
  }, [property, router])

  return (
    <main className="flex h-screen items-center justify-center p-24">
      <Loading className="border-primary" />
    </main>
  )
}