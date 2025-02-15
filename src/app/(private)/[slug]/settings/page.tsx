import SquareNav, { SquareNavItem } from "@/components/SquareNav/SquareNav";
import { Wrapper } from "@/components/Wrapper";
import Cookies from "js-cookie";

const page: React.FC = () => {
        /* const slug = Cookies.get(process.env.NEXT_PUBLIC_PROPERTY_SLUG as string) as string
        const propetyId = Cookies.get(
            process.env.NEXT_PUBLIC_PROPERTY_ID as string
          );
    
console.log("isso", slug, propetyId)    
 */ 
    const navigationItems: SquareNavItem[] = [
        { title: "Usuários", href: `/${"pms_slug"}/settings/users` },
    ]

    return (
        <Wrapper title="CONFIGURAÇÕES" >
            <SquareNav navigationItems={navigationItems} />
        </Wrapper>
    )
}

export default page;
