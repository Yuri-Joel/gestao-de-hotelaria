import { BodyHome } from "@/components/reservas/home/BodyHome";
import { fakeGuest } from "@/data/guest";


const page: React.FC = () => {
    return (
      <div>
        <BodyHome
        data={fakeGuest}
        />
      </div>
      )
}

export default page;