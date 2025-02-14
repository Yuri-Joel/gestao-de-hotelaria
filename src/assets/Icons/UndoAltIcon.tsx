import { Ticon } from "@/types/icon/iconType";

export const UndoAltIncon: React.FC<Ticon> = ({ width, height, fill }) => {
  return (
    <>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#b51010" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        >
          <path 
            d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
          >
          </path>
          <path 
            d="M3 3v5h5"
          >
            </path>
          </svg>

    </>
  );
};

