"use client"
import { ArrowDown } from "@/assets/Icons/ArrowDown";
import { DetailsList } from "./DetailsList";
import { reserveStore } from "@/store/reserveStore";
import { useEffect, useState } from "react";
import { fakeGuestAndCompanion } from "@/utils/api/guest"
import { FaHotel } from "react-icons/fa";
import Link from "next/link";
import { FormRefund } from "./FormRefund";
import { delay } from "@/helpers/delay";
import { Skeleton } from "@/components/Skeleton/Skeleton";

export function DetailsBody() {

  const {isOpenedModalGuest, setIsOpenedModalGuest, isOpenedModalRefund, selectedGuest, setSelectedGuest} = reserveStore()

  const verifyIfIsCompanion = fakeGuestAndCompanion.guest.companion.filter((companion,index) => companion.name === selectedGuest )
  const [loading, setLoading] = useState(false)
  
  function handleCompanion(name:string) {
    localStorage.setItem("guesteSelected", JSON.stringify(name))
    setIsOpenedModalGuest(false)
    window.location.href = "/hotel-ao/reservas/details"
  }

  useEffect(() => {
    (
      async () => {
        const guest = localStorage.getItem("guesteSelected");
        setLoading(true)
        await delay(1000);
        if (guest && guest !== "undefined") {
          setSelectedGuest(JSON.parse(guest));
        }
        setLoading(false)
      }
    )()
  }, [setSelectedGuest]);

  return(
    <div>
      <div className="flex flex-col items-start gap-y-4 mx-5 mt-10">
        <div className="flex flex-col items-start justify-center gap-2 relative">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center justify-center gap-5">
              {
                selectedGuest 
                ? <h1 className="font-bold text-xl">{ selectedGuest ? selectedGuest : fakeGuestAndCompanion.guest.name }</h1>
                : <Skeleton className="w-[12rem] h-7"/>
              }
              <button 
                className="cursor-pointer"
                onClick={() => setIsOpenedModalGuest(!isOpenedModalGuest)}
              >
                <ArrowDown/>
              </button>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <FaHotel className="fill-gray-200"/>
                <Link href="" className="text-primary-700">Booking.com</Link>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaHotel className="fill-gray-200"/>
                <Link href="" className="text-primary-700">SONAR CONEXOES & EQUIPAMENTOS</Link>
              </div>
            </div>
          </div>
          {
            isOpenedModalGuest && (
              <div id="acompanhantes" className="shadow-md shadow-gray-300 w-[217px] absolute top-8 bg-white">
                <div className="flex flex-col gap-2">
                  {
                    verifyIfIsCompanion.length > 0 && (
                      <div className="flex flex-col">
                        <h1 className="font-bold py-3 px-3">Hóspede</h1>
                        <div className="text-center cursor-pointer " onClick={() => handleCompanion(fakeGuestAndCompanion.guest.name)}>
                          <span>{fakeGuestAndCompanion.guest.name}</span>
                        </div>
                      </div>
                    )
                  }
                  <h1 className="font-bold px-3">Acompanhantes</h1>
                  <ul className="text-center">
                    {
                      fakeGuestAndCompanion.guest.companion.map((companion, index) => (
                        <li 
                          key={index} 
                          className={index % 2 !== 0 ? "bg-gray-100 h-[35px] flex items-center justify-center cursor-pointer" : "cursor-pointer h-[35px]"}
                          onClick={() => handleCompanion(companion.name)}
                        >
                          {companion.name}
                        </li>
                      ))
                    }
                  </ul>
                </div>
                
              </div>
            )
          }
        </div>
        <DetailsList/>
      </div>

      {
        isOpenedModalRefund && (
          <FormRefund/>
        )
      }
    </div>
  )
}