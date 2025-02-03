import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const MagnifieIcon: React.FC<Ticon> = ({ width, height }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 15L13.8 13.8M3 8.70001C3 5.55198 5.55198 3 8.7 3C11.848 3 14.4 5.55198 14.4 8.70001C14.4 11.848 11.848 14.4 8.7 14.4C5.55198 14.4 3 11.848 3 8.70001Z"
          stroke="#5954FB"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
