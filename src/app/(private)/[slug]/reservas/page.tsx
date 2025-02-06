import { BodyHome } from "@/components/reservas/home/BodyHome";
import { fakeGuest } from "@/utils/api/guest";


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