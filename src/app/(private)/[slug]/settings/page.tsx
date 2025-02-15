import SquareNav, { SquareNavItem } from "@/components/SquareNav/SquareNav";
import { Wrapper } from "@/components/Wrapper";
import Cookies from "js-cookie";

const page: React.FC = () => {
    const slug = Cookies.get(process.env.NEXT_PUBLIC_PROPERTY_SLUG as string | "")

    const navigationItems: SquareNavItem[] = [
        { title: "Usuários", href: `/${slug}/settings/users` },
    ]

    return (
        <Wrapper title="CONFIGURAÇÕES" >
            <SquareNav navigationItems={navigationItems} />
        </Wrapper>
    )
}

export default page;
