import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const X: React.FC<Ticon> = ({ width, height, fill }) => {
  return (
    <>
      
        <svg
        
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-x h-10 w-10 text-red-600"
            >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
        </svg>
    </>
  );
};

