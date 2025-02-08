import { twMerge } from "tailwind-merge";

interface WrapperProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export function Wrapper({ children, title, className }: WrapperProps) {
  return(
    <div>
      <div className=" border-b w-full border-black px-7 py-5">
        <h1 className="font-bold text-2xl mt-6">{title}</h1>
      </div>
      <div className={twMerge("mt-8 mx-7", className)}>
        {children}
      </div>
    </div>
  )
}
