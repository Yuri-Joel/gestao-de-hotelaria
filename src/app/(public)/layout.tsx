"use client"
import { useEffect } from "react";
import Cookies from 'js-cookie'
import { delay } from "@/helpers/delay";
import { jwtDecode } from "jwt-decode";
import { removeAuthCookie } from "@/helpers/cookies/authCookie";
import { usePathname, useRouter } from "next/navigation";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname();

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

        if (cookie) {
          router.push('/');
        }
      } catch (error) {
        router.push('/');
      }
    })()
  }, [property, pathname, router])

  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
};

export default PublicLayout;
