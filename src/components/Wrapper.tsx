
interface WrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function Wrapper({ children, title, description }: WrapperProps) {
  return(
    <div>
      <div className=" relative border-b w-full border-black px-7 py-5">
        <h1 className="font-bold text-2xl mt-6">{title}</h1>
       {description && ( <h3 className=" bottom-1 font-sm absolute text-sm ">{description}</h3>)}
      </div>
      <div className="mt-8 mx-7">
        {children}
      </div>
    </div>
  )
}