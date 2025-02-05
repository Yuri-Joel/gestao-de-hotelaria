"use client"
import { MenuProfile } from "@/components/MenuProfileDrop/MenuProfile";
import { ReservationSearch } from "@/components/ReserveSearch/ReserveSearch";
import { Sidebar } from "@/components/Sidebar/Sidebar";

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-screen">
      <MenuProfile />
      <ReservationSearch />
      <div className="pt-[60px] flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-white-100">
          <div className="">{children}</div>
        </main>
      </div>

    </div>
  );
};

export default PrivateLayout;  
