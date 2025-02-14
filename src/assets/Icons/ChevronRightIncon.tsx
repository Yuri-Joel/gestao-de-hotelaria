import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const ChevronRightIcon: React.FC<Ticon> = ({ width, height, fill }) => {
  return (
    <>
      <svg 
        stroke="currentColor" 
        fill="currentColor" 
        strokeWidth="0" 
        viewBox="0 0 24 24" 
        className="size-4" 
        height={height || "1em"} 
        width={width || "1em"} 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
        ></path>
      </svg>

    </>
  );
};
