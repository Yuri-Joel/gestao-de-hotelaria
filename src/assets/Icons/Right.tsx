import { Ticon } from "@/types/icon/iconType";
import React from "react";

export const Right: React.FC<Ticon> = ({ width, height, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-check h-10 w-10 text-green-600"
    >
      <path d="M20 6 9 17l-5-5"></path>
    </svg>
  );
};
