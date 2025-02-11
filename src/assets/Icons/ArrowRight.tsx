import { Ticon } from "@/types/icon/iconType";
import React from "react";
//#B0B0B0
export const ArrowRight: React.FC<Ticon> = ({ fill, width = "8", height = "14" , stroke}) => {
    return (
        <>
            {/* #5954FB"  */}
            <svg width={width} height={height} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L6.29289 7.70711C6.62623 7.37377 6.79289 7.20711 6.79289 7C6.79289 6.79289 6.62623 6.62623 6.29289 6.29289L1 1" stroke={stroke || "#B0B0B0"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};



