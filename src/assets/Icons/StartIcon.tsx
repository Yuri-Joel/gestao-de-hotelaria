import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const StartIcon: React.FC<Ticon> = ({ width, height, fill }) => {
    return (
        <>
            <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill={fill || "black"} xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
        </>
    );
};
