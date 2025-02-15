import { twMerge } from "tailwind-merge";

interface WrapperProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  description?: string;
}

export function Wrapper({
  children,
  title,
  description,
  className,
}: WrapperProps) {
  return (
    <div>
      <div
        className={`  ${description ? "" : "flex flex-col flex-start justify-start"} border-b w-full border-black px-7 py-5 `}
      >
        <h1 className={`font-bold text-2xl uppercase ${description ? "" : "mt-6"} `}>
          {title}
        </h1>
        {description && (
          <h3 className=" bottom-1 font-sm  text-sm ">{description}</h3>
        )}
      </div>
      <div className={twMerge("mt-8 mx-7", className)}>{children}</div>
    </div>
  );
}
