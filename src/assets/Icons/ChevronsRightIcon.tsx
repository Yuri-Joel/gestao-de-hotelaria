import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const ChevronsRightIcon: React.FC<Ticon> = ({ width, height, fill }) => {
  return (
    <>
      <svg 
        stroke="currentColor" 
        fill="currentColor" 
        strokeWidth="0" 
        viewBox="0 0 24 24" 
        className="size-4" 
        height="1em" width="1em" 
        xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z"
          ></path>
          <path 
            d="M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z"
          ></path>
        </svg>
    </>
  );
};
