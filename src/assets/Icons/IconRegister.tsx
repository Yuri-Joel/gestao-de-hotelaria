import { Ticon } from "@/types/icon/iconType";
import React from "react";


export const IconRegister: React.FC<Ticon> = ({height, width, fill}) => (
    <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill={fill || "black"} xmlns="http://www.w3.org/2000/svg" stroke="none">
      <path d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v14h14V5H5zm2 3h10v2H7V8zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
    </svg>
  );
  
  