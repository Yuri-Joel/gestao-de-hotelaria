'use client'
import { useState } from "react";
import { Input } from "../Input/Input";

export function Header() {

  const [value, setValue] = useState("")

  function handleValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return(
    <div className="flex flex-col items-start">
      <div className="w-[300px] space-y-4">
        <h1 className="font-semibold">Todas as Propriedades</h1>
        <Input
          value={value}
          placeholder="Nome ou ID da propriedade"
          handleValue={handleValue}
          className="h-12"
        />          
      </div>
        <div className="bg-black h-[2px] w-full mt-12"></div>
    </div>
  )
}