import { Ticon } from "@/types/icon/iconType";
import React from "react";
//#B0B0B0
export const ArrowLeft: React.FC<Ticon> = ({ fill, width = "8", height = "14" }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1.70711 6.29289C1.37377 6.62623 1.20711 6.79289 1.20711 7C1.20711 7.20711 1.37377 7.37377 1.70711 7.70711L7 13" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        </>
    );
};


