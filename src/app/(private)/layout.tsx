"use client";
import HeadTitle from "@/components/HeadTitle";
import { MenuProfile } from "@/components/MenuProfileDrop/MenuProfile";
import { ReservationSearch } from "@/components/ReserveSearch/ReserveSearch";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { formatPathName } from "@/helpers/formatPathString";
import { modalManagementStore } from "@/store/modalManagementStore";
import { usePathname, useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import "../../app/custom-datepicker.css";
import { Header } from "@/components/Header/Header";
import AlertDialog from "@/components/AlertDialog/AlertDialog";
import { useEffect } from "react";
import Cookies from 'js-cookie'
import { delay } from "@/helpers/delay";
import { jwtDecode } from "jwt-decode";
import { removeAuthCookie } from "@/helpers/cookies/authCookie";

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter()
  const pathname = usePathname();

  const route = pathname.split('/')[2]?.toUpperCase();

  const { handleOpenAlertDialogConfirmLogout, isOpenedAlertDialogConfirmLogout } = modalManagementStore();

  const property = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_ID}`)
  const slug = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_SLUG}`)

  const handleOut = () => {
    // removeAuthCookie() // remove o cookie do navegador
    window.location.href = '/login'
  }


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
  const pathArray = pathname.split('/').filter(Boolean); // Remove strings vazias
  const newPath = pathArray.pop(); // Pega e remove o último item

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
          return
        } else if (cookie && (!slug || !property)) {
          if (pathname.split('/')[1] === "propriedades") {
            return
          } else {
            return router.push(`/propriedades`);
          }
        } else {
          removeAuthCookie();
          router.push('/login');
        }
      } catch (error) {
        removeAuthCookie();
        router.push('/login');
      }
    })()
  }, [property, pathname, router])


  return (
    <>
      <HeadTitle title={route && `${route} - Hoteli Apps - PMS`} />

      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-col h-screen">
          <MenuProfile />
          <ReservationSearch />
          <div className="pt-[60px] flex flex-1 overflow-hidden">
            {/* { newPath !== ("add-property") &&  <Sidebar />} */}
            {(pathname.split('/')[1] !== "propriedades" && formatPathName(pathname) !== "settings") && <Sidebar />}

            <main className="flex-1 overflow-auto bg-white-100">
              <div className="">{children}</div>
            </main>
          </div>
        </div>

        <AlertDialog
          typeAlert="confirm"
          title="Tem certeza que deseja terminar a sua sessão?"
          description="Ao confirmar, as sua sessão será terminada."

          confirmTitleBtn="Sim, tenho certeza"
          cancelTitleBtn="Cancelar"

          hideTypeAlertIcon
          modeLogout

          isOpenedModalManagement={isOpenedAlertDialogConfirmLogout}
          handleConfirm={handleOut}
          handleCancel={handleOpenAlertDialogConfirmLogout}
          isBtnLoading={false}
        />
      </div>
    </>
  );
};

export default PrivateLayout;
