"use client"
import { BodyHome } from "@/components/reservas/home/BodyHome";
import { useEffect, useState } from "react";



const page: React.FC = () => {
  
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/reservas");
        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    }

    fetchData();
  }, []);
    return (
      <div>
        <BodyHome
        data={reservas}
        />
      </div>
      )
}

export default page;