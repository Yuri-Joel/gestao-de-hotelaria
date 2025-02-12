"use client"
import { useEffect } from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
};

export default PublicLayout;
