import { Header } from "@/components/header/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex flex-col h-screen">
       <Header />  
     
       <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 bg-gray-100">
          <div className="rounded-lg border bg-white p-4 shadow">{children}</div>
        </main>
      </div>
     
    </div>
  )
}

export default PrivateLayout;
