'use client'
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { formatDateShort } from "@/helpers/formatDateExperimental";
import { reservaStore } from "@/store/reservasStore";
import { Wrapper } from "@/components/Wrapper";
import React, { useState, useRef, useEffect } from "react";

const areaRoom = [
  {
    room: "100"
  },
  {
    room: "101"
  },
  {
    room: "102"
  },
  {
    room: "103"
  },
  {
    room: "104"
  },
  {
    room: "105"
  },
  {
    room: "106"
  },
  {
    room: "107"
  },
  {
    room: "108"
  },
  {
    room: "109"
  },
  {
    room: "110"
  },
  {
    room: "200"
  },
  {
    room: "201"
  },
  {
    room: "202"
  },
  {
    room: "203"
  },
  {
    room: "204"
  },
  {
    room: "205"
  },
  {
    room: "206"
  },
  {
    room: "207"
  },
  {
    room: "208"
  },
  {
    room: "209"
  },
]

const areaDetailsDay = [
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },

  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
  {
    date: "5",
    day: "DOM"
  },
]

const areaAvailable = [
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
]

export function BodyMap() {
  const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
  const {
    currentDate,
    setCurrentDate
  } = reservaStore()

  const indexDay = new Date().getDay()
  const year = new Date().getFullYear()
  const newDate = days[indexDay] + " , " + formatDateShort(currentDate) + " " + year

  function prevMonth() {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate)
  }

  function nextMonth() {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate)
  }

  return (
    <Wrapper title="RESERVAS - MAPA">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <button className="bg-gray-90 size-6 rounded-full flex items-center justify-center">
            <CgChevronLeft
              className="size-5"
              onClick={prevMonth}
            />
          </button>

          <span>{newDate}</span>

          <button className="bg-gray-90 size-6 rounded-full text-center flex items-center ">
            <CgChevronRight
              className="size-5"
              onClick={nextMonth}
            />
          </button>
        </div>

        <div
          className="flex h-full w-full mb-5 bg-red-200 relative overflow-auto"
          style={{
            height: 10 * 72 // 10 linhas de 72px de altura
          }}
        >
          {/* Sidebar de Quartos */}
          <div
            className="bg-gray-200 h-full w-[195px] max-w-[195px] min-w-[195px] flex flex-col border-r-4 border-gray-300 absolute"
            style={{
              height: (areaRoom.length * 56) + 72, // altura ajustada conforme o número de quartos
            }}
          >
            <h1 className="h-[72px] min-h-[72px] border-b-4 border-gray-300 flex items-center justify-center">Quartos</h1>

            <div className="flex flex-col">
              {
                areaRoom.map((item, key) => {
                  return (
                    <div key={key} className="h-14 flex items-center border-b border-b-gray-300 pl-2.5">
                      <span>{item.room}</span>
                    </div>
                  )
                })
              }
            </div>
          </div>

          {/* Área de Detalhes Dias e Reservas */}
          {/* <div className="flex flex-col w-screen h-full overflow-x-auto"> */}
          <div className="flex flex-col w-screen h-full pl-[195px]">
            {/* Cabeçalho de Dias */}
            <div
              className="bg-gray-200 w-full h-[72px] min-h-[72px] flex items-center border-b-4 border-gray-300"
              style={{
                width: areaDetailsDay.length * 72 // largura com base no número de dias
              }}
            >
              {
                areaDetailsDay.map((item, key) => {
                  return (
                    <div key={key} className="flex flex-col items-center min-w-[72px] max-w-[72px] border-r border-r-gray-300">
                      <span>{item.day}</span>
                      <span>{item.date}</span>
                    </div>
                  )
                })
              }
            </div>

            {/* Tabela de Reservas */}
            <div
              className={`bg-gray-200`}
              style={{
                height: areaRoom.length * 56, // altura ajustada conforme o número de quartos
                width: areaDetailsDay.length * 72 // largura ajustada conforme o número de dias
              }}
            >
              {
                areaRoom.map((room, keyRoom) => {
                  return (
                    <div key={keyRoom} className="flex">
                      {
                        areaDetailsDay.map((dDay, keyDDay) => {
                          return (
                            <div key={keyDDay}>
                              <div className="h-14 min-w-[72px] max-w-[72px] border-b border-b-gray-300 border-r border-r-gray-300" />


                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>


      </div>
    </Wrapper>
  );
}
