import { Header } from "@/components/Header/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex flex-col h-screen">
       <Header />  
     
       <div className="pt-[60px] flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-white-100">
          <div className="">{children}</div>
        </main>
      </div>
     
    </div>
  )
}

export default PrivateLayout;
