import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps extends ComponentProps<"div">{
  children: React.ReactNode;
  title: string
}

export function Box(props: BoxProps) {

  return(
    <div className={twMerge("shadow-lg shadow-gray-350", props.className)}>
      <div className="flex flex-col py-7 px-6 gap-y-3">
        <h1 className="font-bold text-md">
          {props.title}
        </h1>
        {props.children}
      </div>
    </div>
  )
  
}