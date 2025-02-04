import { Ticon } from "@/types/icon/iconType";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NavIcon: React.FC<Ticon> = ({ width, height, fill, stroke }) => {
    return (
        <>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={stroke || "white"}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </>
    );
};
