"use client"
import { Header } from "@/components/header/Header";

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="bg-white h-screen">
      <Header />
      {children}
    </div>
  )
}

export default PrivateLayout;
