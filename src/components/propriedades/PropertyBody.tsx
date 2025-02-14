"use client"
import { useEffect } from "react";

import { PropertiesList } from "./PropertiesList";
import { propertyStore } from "@/store/propertyStore";

export function PropertyBody() {
  const {
    properties,
    find,
    currentPage,
    create
  } = propertyStore()

  useEffect(() => {
    (async () => {
      try {
        await find(currentPage)
      } catch (Err) {
        console.log({ message: "Erro ao buscar dados das propriedades" });
      } finally {
      }
    })()
  }, [currentPage, find, create])

  return (
    <div className="mt-5">
      <PropertiesList data={properties} />
    </div>
  )
}