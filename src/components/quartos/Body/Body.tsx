"use client"
import { Wrapper } from "@/components/Wrapper"
import FloorCarousel from "../FloorCarrousel/FloorCarrousel"
import { RoomDetailModal } from "@/components/rooms/roomDetailModal/RoomDetailModal"
import { useEffect, useState } from "react"
import { floorStore } from "@/store/flooorStore"
import { delay } from "@/helpers/delay"



export const Body = () => {

    const { getFloors, selectedFloor, floors } = floorStore();
    const [loading, setloading] = useState(false)
    useEffect(() => {
        (async () => {
            setloading(true)
            await delay(2000)
            await getFloors()
            setloading(false)
        })()
    }, [!floors])

    return (
        <>
            <Wrapper title="Quartos - MAPA">
                <div className="w-full">
                    <div className="">
                    <FloorCarousel loading={loading} setloading={setloading} />
                    </div>
                    {/*  <RoomDetailModal room={selectedFloor} /> */}
                </div>
            </Wrapper>
        </>
    )
}