"use client";

import { TTabNavigation } from "@/types/TTabNavigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface TabNavigationProps {
  menuItems: TTabNavigation[];
  selectedTitle: string;
  setSelectedTitle: (data: any) => void;
  isCarrousel?: boolean
}

export const TabNavigation = ({ menuItems, selectedTitle, setSelectedTitle, isCarrousel = false }: TabNavigationProps) => {
  const TabNavigationRef = useRef<HTMLDivElement>(null);
  const [ScrollLeft, setScrollLeft] = useState(false);
  const [ScrollRight, setScrollRight] = useState(false);

  const checkScrollPosition = () => {
    if (TabNavigationRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = TabNavigationRef.current;
      setScrollLeft(scrollLeft > 0);
      setScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (TabNavigationRef.current) {
      const scrollAmount = 200;
      TabNavigationRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  // new ResizeObserver:
  //Monitora alterações nas dimensões de um elemento DOM. ele é usado para detectar mudanças no tamanho do carrossel e garantir que a visibilidade das setas seja ajustada dinamicamente.
  useEffect(() => {
    // Cria um novo observador para detectar mudanças no tamanho do elemento
    const observer = new ResizeObserver(() => {
      checkScrollPosition(); // Chama a função para verificar a posição do scroll sempre que o tamanho muda
    });


    if (TabNavigationRef.current) {
      // Observa o elemento do carrossel para detectar mudanças no tamanho
      observer.observe(TabNavigationRef.current);
    }

    // Remove o observador quando o componente é desmontado
    return () => {
      if (TabNavigationRef.current) {
        observer.unobserve(TabNavigationRef.current); // Para de observar o elemento
      }
    };
  }, []);


  return (
    <div className="relative border-b">
      {/* Left Arrow */}
      {ScrollLeft && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md"
          onClick={() => scroll("left")}
        >
          <FaArrowLeft size={25} />
        </button>
      )}

      {/* Tab Navigation TabNavigation */}
      <div
        ref={TabNavigationRef}
        className="flex items-center gap-2 px-5 py-5 overflow-x-auto no-scrollbar"
        onScroll={checkScrollPosition}
      >
        {menuItems.map((item) => (
          <div key={item.id} className="relative whitespace-nowrap">
            <div
              className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 cursor-pointer transition-colors ${selectedTitle === item.label ? "text-black" : "text-gray-500"
                }`}
              onClick={() => setSelectedTitle(item.label)}
            >
              {isCarrousel ? item.label?.length >= 10
                ? item?.label.substring(0, 10) + '...'
                : item?.label : item?.label}
            </div>
            {selectedTitle === item.label && (
              <div className="absolute -bottom-5 left-0 w-full h-[5px] bg-primary rounded-sm transition-all duration-300 ease-in-out"></div>
            )}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {ScrollRight && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md"
          onClick={() => scroll("right")}
        >
          <FaArrowRight size={25} />
        </button>
      )}
    </div>
  );
};