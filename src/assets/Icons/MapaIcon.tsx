import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const MapaIcon: React.FC<Ticon> = ({ width, height, fill }) => {
    return (
        <>
            <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill={fill || "black"} xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 4.27 5.4 10.68 6.17 11.54a1 1 0 0 0 1.66 0C13.6 19.68 19 13.27 19 9c0-3.87-3.13-7-7-7zm0 15.4C10.3 15 7 11.37 7 9a5 5 0 0 1 10 0c0 2.37-3.3 6-5 8.4z" />
                <circle cx="12" cy="9" r="2.5" />
                <path d="M20.5 21.5h-17a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h17a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5z" />
            </svg>

        </>
    );
};
