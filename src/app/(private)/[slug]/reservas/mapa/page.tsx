import UnderDevelopmentMode from "@/components/UnderDevelopmentMode/UnderDevelopmentMode";
import { Wrapper } from "@/components/Wrapper";
import { BodyMap } from "@/components/reservas/mapa/bodyMap";

const page: React.FC = () => {
  // return (
  //   <div>
  //     <BodyMap />
  //   </div>
  // )

  return <Wrapper title="RESERVAS - MAPA" children={<UnderDevelopmentMode />} />;
}

export default page;