"use client"
import { PropertiesList } from "./PropertiesList";
import { propertyStore } from "@/store/propertyStore";
import { useEffect, useState } from "react";



export function PropertyBody() {

  const {
    properties,
    find,
    currentPage
  } = propertyStore()

  
  useEffect(() => {
    (
      async () => {
        try{
          await find(currentPage)
        }catch(Err){
          console.log({message: "Erro ao buscar dados das propriedades"});
        } finally {
        }
      }
    )()
  }, [currentPage, find])

  return(
    <div>
      <PropertiesList 
        data={properties}
      />
    </div>
  )

}