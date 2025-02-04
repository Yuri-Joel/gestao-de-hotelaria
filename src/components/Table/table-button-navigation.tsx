import { ComponentProps } from "react";


interface IconButtonProps extends ComponentProps<"button">{
  transparent?:boolean
}

export function IconButton({transparent, ...props}: IconButtonProps) {

  return(
    <button 
      {...props}
      className={
        transparent 
        ? "bg-black/20 cursor-pointer border p-1.5 transition duration-150 ease-in-out rounded-md"
        : "cursor-pointer border border-black/10 p-1.5 transition duration-150 ease-in-out rounded-md hover:bg-blue-100"
      }
    />
  )
}