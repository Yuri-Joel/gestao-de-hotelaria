"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/Button/Button'
import { floorStore } from '@/store/flooorStore'
import { ArrowLeft } from '@/assets/Icons/ArrowLeft'
import { ArrowRight } from '@/assets/Icons/ArrowRight'
import { Skeleton } from '@/components/Skeleton/Skeleton'

interface FloorCarouselProps { 
    loading: boolean
    setloading: (arg: boolean)=> void
}

const FloorCarousel: React.FC<FloorCarouselProps> = ({loading, setloading}) => {
    const { floors, selectedFloor, setSelectedFloor } = floorStore()
    const carouselRef = useRef<HTMLDivElement>(null)

    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const [lastScrollLeft, setLastScrollLeft] = useState(0);
    

    // Função para verificar a posição do scroll e mostrar/esconder as setas
    const checkScrollPosition = () => {
        // Verifica se o elemento do carrossel está disponível
        if (carouselRef.current) {
            // Obtém as propriedades relevantes do elemento:
            // - scrollLeft: a posição atual do scroll horizontal
            // - scrollWidth: a largura total do conteúdo no carrossel
            // - clientWidth: a largura visível do carrossel
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

            // Caso o scroll esteja indo para a direita (scrollLeft aumentou em relação ao último valor)
            if (scrollLeft > lastScrollLeft) {
                // Define se a seta da esquerda deve ser exibida (true se scrollLeft > 0)
                setShowLeftArrow(scrollLeft > 0);
                // Define se a seta da direita deve ser exibida (true se ainda há conteúdo para scrollar à direita)
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
            }
            // Caso o scroll esteja indo para a esquerda (scrollLeft diminuiu ou permaneceu igual ao último valor)
            if (scrollLeft <= lastScrollLeft) {
                // Mesmo comportamento para verificar visibilidade das setas
                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
            }

            // Atualiza o último valor de `scrollLeft` para acompanhar a direção do scroll
            setLastScrollLeft(scrollLeft);
        }
    };

    // Funções para scrollar para a esquerda e direita
    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' })
            setTimeout(checkScrollPosition, 300) // Atualiza a posição após o scroll.
        }
    }

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' })
            setTimeout(checkScrollPosition, 300) // Atualiza a posição após o scroll.
        }
    }

    // Verifica a posição inicial do scroll ao montar o componente
    useEffect(() => {
        checkScrollPosition()

        // Adiciona um listener para atualizar as setas quando o usuário scrolla
        if (carouselRef.current) {
            carouselRef.current.addEventListener('scroll', checkScrollPosition)
        }

        // Remove o listener quando o componente é desmontado
        return () => {
            if (carouselRef.current) {
                carouselRef.current.removeEventListener('scroll', checkScrollPosition)
            }
        }
    }, [])


    // new ResizeObserver:
    //Monitora alterações nas dimensões de um elemento DOM. ele é usado para detectar mudanças no tamanho do carrossel e garantir que a visibilidade das setas seja ajustada dinamicamente.
    useEffect(() => {
        // Cria um novo observador para detectar mudanças no tamanho do elemento
        const observer = new ResizeObserver(() => {
            console.log("isso" ,observer);
            
            checkScrollPosition(); // Chama a função para verificar a posição do scroll sempre que o tamanho muda
        });


        if (carouselRef.current) {
            // Observa o elemento do carrossel para detectar mudanças no tamanho
            observer.observe(carouselRef.current);
        }

        // Remove o observador quando o componente é desmontado
        return () => {
            if (carouselRef.current) {
                observer.unobserve(carouselRef.current); // Para de observar o elemento
            }
        };
    }, []);


    return (
        <>

            {loading ?
                [...Array(1)].map((_, i) => (
                    <div key={i} className="p-4 bg-white">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                    </div>
                ))
                :
                Array.isArray(floors) && floors?.length > 0 && (
                    <div className="grid grid-cols-[auto_1fr_auto] items-center w-full">
                        {showLeftArrow && <Button
                            handleClick={scrollLeft}
                            handleActive={() => true}
                            isLoading={false}
                            className="py-2 pr-2 rounded-l disabled:opacity-50 bg-transparent"
                            style={{ justifySelf: 'start' }}
                        >
                            <ArrowLeft
                                width="24"
                                height="24"
                                className="size-6"
                                style={{ cursor: 'default' }}
                            />
                        </Button>}

                        <div
                            ref={carouselRef}
                            className="flex overflow-x-auto space-x-2 p-2 w-full no-scrollbar scroll-smooth"
                        >
                            <Link href={`#`}>
                                <div
                                    onClick={() => setSelectedFloor(null)}
                                    className={`flex-shrink-0 w-[115px] h-10 p-2 border-b cursor-pointer ${selectedFloor === null
                                        ? 'text-primary border-primary'
                                        : 'text-gray-500 border-gray-300'
                                        }`}
                                    style={{ scrollSnapAlign: 'start' }}
                                >
                                    Todos
                                </div>
                            </Link>

                            {floors?.map((floor, index) => (
                                <Link
                                    key={index}
                                    href={`#`}
                                >
                                    <div
                                        key={floor._id?.toString()}
                                        onClick={() => setSelectedFloor(floor)}
                                        className={`flex-shrink-0 w-[115px] h-10 p-2 border-b cursor-pointer ${selectedFloor === floor
                                            ? 'text-primary border-primary'
                                            : 'text-gray-500 border-gray-300'
                                            }`}
                                        style={{
                                            scrollSnapAlign: 'start',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',//adiciona reticiencia no final do texto. 
                                        }}
                                    >
                                        {floor?.title?.length >= 10
                                            ? floor?.title.substring(0, 10) + '...'
                                            : floor?.title}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {showRightArrow && <Button
                            handleClick={scrollRight}
                            handleActive={() => true}
                            isLoading={false}
                            className="py-2 pl-2 rounded-r disabled:opacity-50 bg-transparent"
                            style={{ justifySelf: 'end' }}
                        >
                            <ArrowRight
                                width="24"
                                height="24"
                                className="size-6"
                                style={{ cursor: 'default' }}
                            />
                        </Button>}
                    </div>
                )}
        </>
    )
}

export default FloorCarousel
