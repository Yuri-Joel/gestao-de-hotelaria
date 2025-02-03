import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const DirectionRightIcon: React.FC<Ticon> = ({ fill }) => {
  return (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 14 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.8516 3.67914C11.1736 2.85343 10.8345 2.44058 10.3711 2.22029C9.90759 2 9.37801 2 8.31886 2L3 2C2.05719 2 1.58579 2 1.29289 2.29289C1 2.58579 1 3.05719 1 4L1 7C1 7.94281 1 8.41421 1.29289 8.70711C1.58579 9 2.05719 9 3 9L8.31886 9C9.37801 9 9.90759 9 10.3711 8.77971C10.8345 8.55942 11.1736 8.14656 11.8516 7.32086L12.1202 6.99376C12.7067 6.27951 13 5.92239 13 5.5C13 5.07761 12.7067 4.72048 12.1202 4.00624L11.8516 3.67914Z"
          fill="#B0B0B0"
          stroke="#B0B0B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 9L5 19"
          stroke="#B0B0B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 1L5 2"
          stroke="#B0B0B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 19L9 19"
          stroke="#B0B0B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
