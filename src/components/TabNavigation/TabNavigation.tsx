"use client";

import { ArrowLeft } from "@/assets/Icons/ArrowLeft";
import { ArrowRight } from "@/assets/Icons/ArrowRight";
import { floorStore } from "@/store/floorStore";
import { TTabNavigation } from "@/types/TTabNavigation";
import { useEffect, useRef, useState } from "react";

interface TTabNavigationProps {
id: number;
label: string;
}
interface TabNavigationProps {
  menuItems: TTabNavigation[];
  selectedTitle: TTabNavigationProps;
  setSelectedTitle: (data: any) => void;
  isCarrousel?: boolean
  setCurrentPage?: (arg: number)=>void
}

export const TabNavigation = ({ menuItems, selectedTitle, setSelectedTitle, isCarrousel = false , setCurrentPage}: TabNavigationProps) => {
  const TabNavigationRef = useRef<HTMLDivElement>(null);
  const [ScrollLeft, setScrollLeft] = useState(false);
  const [ScrollRight, setScrollRight] = useState(false);
  const [lastScrollLeft, setLastScrollLeft] = useState(0);
const {currentPage}= floorStore()
  const checkScrollPosition = () => {
    if (TabNavigationRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = TabNavigationRef.current;
      setScrollLeft(scrollLeft > 0);
      setScrollRight(scrollLeft + clientWidth + 1 < scrollWidth);

     /*  const isScrollingRight = scrollLeft > lastScrollLeft; // Verifica se o scroll está indo para a direita
    setLastScrollLeft(scrollLeft); // Atualiza o valor do scroll anterior

    // Atualiza currentPage baseado na direção do scroll
    if (isScrollingRight && setCurrentPage) {
      setCurrentPage(currentPage + 1);
    } else if (!isScrollingRight && setCurrentPage) {
      setCurrentPage(Math.max(currentPage - 1, 0));
  } */
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (TabNavigationRef.current) {
      const scrollAmount = 200;
      TabNavigationRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      if (setCurrentPage) {
        setCurrentPage(direction === "right" ? currentPage + 1 : Math.max(currentPage - 1, 0));
      }
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
    <div className="relative border-b bg-white">
      {/* Left Arrow */}
      {ScrollLeft && (
        <button
          className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 bg-transparent p-2 hover:shadow-lg  transition-all duration-300 ease-in-out hover:bg-gray-200 hover:rounded-full hover:scale-110"
          onClick={() => scroll("left")}
        >
          <ArrowLeft
            width="24"
            height="24"
           stroke={"black"}
          />
        </button>
      )}

      {/* Tab Navigation Container */}
      <div
        ref={TabNavigationRef}
        className="flex items-center gap-2 px-5 py-5 overflow-x-auto scrollbar-invisible scroll-smooth"
        onScroll={checkScrollPosition}
      >
        {menuItems.map((item) => (
          <div key={item.id} className="relative whitespace-nowrap">
            <button
              className={`px-6 py-2 text-sm rounded-md flex items-center gap-2 cursor-pointer transition-colors duration-300 ease-in-out ${selectedTitle.id === item.id ? "text-black" : "text-gray-500"
                }`}
              onClick={() => setSelectedTitle(item)}
            >
              {isCarrousel ? item.label.length > 10 ? `${item.label.substring(0, 10)}...` : item.label : item.label}
            </button>
            {selectedTitle.id === item.id && (
              <div className="absolute -bottom-5 left-0 w-full h-[5px] bg-primary rounded-sm transition-all duration-300 ease-in-out"></div>
            )}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {ScrollRight && (
        <button
          className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2  hover:shadow-lg  transition-all duration-300 ease-in-out hover:bg-gray-200 hover:rounded-full hover:scale-110"
          onClick={() => scroll("right")}
        >
          <ArrowRight 
           width="24"
           height="24"
           stroke="black"
            />
        </button>
      )}
    </div>
  );
};