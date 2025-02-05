
interface BoxProps{
  children: React.ReactNode;
  title: string
}

export function Box({children, title}: BoxProps) {

  return(
    <div className="shadow-lg shadow-gray-450 rounded-md border border-gray-90 h-[225px]">
      <div className="flex flex-col py-7 px-6 gap-y-3">
        <h1 className="font-bold text-md">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
  
}