import React from "react";
import { twMerge } from "tailwind-merge"

interface T extends React.ComponentProps<'div'> { }

export const Loading: React.FC<T> = ({ ...props }) => {
  return (
    <div className={twMerge("rounded-full w-7 h-7 mx-auto border-t-1 border-r-1 border-b-2 border-l-2 border-white animate-spin", props.className)}></div>
  );
}
