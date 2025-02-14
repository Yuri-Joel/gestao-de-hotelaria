import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const ChevronLeftIcon: React.FC<Ticon> = ({ width, height, fill }) => {
  return (
    <>
      <svg 
        stroke="currentColor" 
        fill="currentColor" 
        strokeWidth="0" 
        viewBox="0 0 24 24" 
        className="size-4" 
        height="1em" 
        width="1em" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
        ></path>
      </svg>
    </>
  );
};
