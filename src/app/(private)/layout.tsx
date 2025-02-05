"use client";
import AlertDialog from "@/components/alertDialog/alertDialog";
import { Header } from "@/components/header/Header";
import { modalManagementStore } from "@/store/modalManagementStore";

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
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <AlertDialog
            typeAlert="Voltar"
            title="Tem certeza que deseja terminar a sua sessão?"
            description="Ao confirmar, as sua sessão será terminada."
            confirmTitleBtn="Sim, tenho certeza"
            cancelTitleBtn="Cancelar"
            isOpenedModalManagement={isOpenedAlertDialogConfirmLogout}
            handleConfirm={handleOut}
            handleCancel={handleOpenAlertDialogConfirmLogout}
            isBtnLoading={false}
          />
      <div className="">{children}</div>
    </div>
  );
};

export default PrivateLayout;
