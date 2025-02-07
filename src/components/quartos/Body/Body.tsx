import { Wrapper } from "@/components/Wrapper"
import FloorCarousel from "../FloorCarrousel/FloorCarrousel"
import { RoomDetailModal } from "@/components/rooms/roomDetailModal/RoomDetailModal"



export const Body = () => {


    return (
        <>
            <Wrapper title="Quartos - MAPA">
                <div className="w-full">
                    <FloorCarousel />
                  {/*   <RoomDetailModal /> */}
                </div>
            </Wrapper>
        </>
    )
}