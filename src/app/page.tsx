/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Loading } from "@/components/Loading/Loading";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { delay } from "@/helpers/delay";
import { jwtDecode } from "jwt-decode";
import { removeAuthCookie } from "@/helpers/cookies/authCookie";

export default function page() {
  const router = useRouter()

  const property = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_ID}`)
  const slug = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_SLUG}`)

  useEffect(() => {
    const updateOnlineStatus = () => {
      console.log(navigator.onLine ? "Conexão restabelecida" : "Sem conexão de internet");
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const cookie = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME}`)

        const decoded: any = jwtDecode(cookie as string);

        const expiresIn = decoded.exp;

        if (!expiresIn) {
          removeAuthCookie();
          router.push('/login');
          return
        }

        const dateExp = new Date(expiresIn * 1000);
        const nowDate = new Date();

        if (nowDate > dateExp) {
          removeAuthCookie();
          router.push('/login');
        } else if (cookie && (slug && property)) {
          router.push(`/${slug}/home`);
        } else if (cookie && (!slug || !property)) {
          router.push(`/propriedades`);
        } else {
          removeAuthCookie();
          router.push('/login');
        }
      } catch (error) {
        removeAuthCookie();
        router.push('/login');
      }
    })()
  }, [property, router])

  return (
    <main className="flex h-screen items-center justify-center p-24">
      <Loading className="border-primary" />
    </main>
  )
}