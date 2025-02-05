import { DetailsList } from "@/components/reservas/DetailsList";

const page: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col items-start space-y-4 mx-5 mt-10">
        <h1 className="font-bold text-xl">Nicolas Silva Bispo</h1>
        <DetailsList/>
      </div>
    </div>
  )
}

export default page;