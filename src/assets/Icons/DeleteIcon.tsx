
import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const DeleteIcon: React.FC<Ticon> = ({ width, height, fill }) => {
  return (
    <>
      <svg 
        stroke="#b51010" 
        fill="currentColor" 
        strokeWidth="0" 
        viewBox="0 0 512 512" 
        height="18" 
        width="18"  
        xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="32" 
            d="m112 112 20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
            ></path>
            <path 
              strokeLinecap="round" 
              strokeMiterlimit="10" 
              strokeWidth="32" 
              d="M80 112h352"
              ></path>
              <path 
                fill="none" 
                strokeLinecap="round" 
                strokeMiterlimit="round" 
                strokeWidth="32" 
                d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40m-64 64v224m-72-224 8 224m136-224-8 224"
                ></path>
        </svg>

    </>
  );
};
