import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const ChevronsLeftIcon: React.FC<Ticon> = ({ width, height, fill }) => {
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
          d="m12.707 7.707-1.414-1.414L5.586 12l5.707 5.707 1.414-1.414L8.414 12z"
        ></path>
        <path 
          d="M16.293 6.293 10.586 12l5.707 5.707 1.414-1.414L13.414 12l4.293-4.293z"
          ></path>
      </svg>
    </>
  );
};
