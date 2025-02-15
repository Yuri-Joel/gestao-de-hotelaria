"use client";
import HeadTitle from "@/components/HeadTitle";
import { MenuProfile } from "@/components/MenuProfileDrop/MenuProfile";
import { ReservationSearch } from "@/components/ReserveSearch/ReserveSearch";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { formatPathName } from "@/helpers/formatPathString";
import { modalManagementStore } from "@/store/modalManagementStore";
import { usePathname } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import "../../app/custom-datepicker.css";
import { Header } from "@/components/Header/Header";
import AlertDialog from "@/components/AlertDialog/AlertDialog";
import { useEffect } from "react";

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const { handleOpenAlertDialogConfirmLogout, isOpenedAlertDialogConfirmLogout } = modalManagementStore();

  const handleOut = () => {
    // removeAuthCookie() // remove o cookie do navegador
    window.location.href = '/login'
  }

  const pathname = usePathname();

  const route = pathname.split('/')[2]?.toUpperCase();

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
