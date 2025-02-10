import SquareNav, { SquareNavItem } from "@/components/SquareNav/SquareNav";
import { Wrapper } from "@/components/Wrapper";

const page: React.FC = () => {

    const slug = "hotel-ao"
    const navigationItems: SquareNavItem[] = [
        { title: "Usuario", href: `/${slug}/settings/users` },
    ]

    return (
        <Wrapper title="CONFIGURAÇÕES" >
                <SquareNav navigationItems={navigationItems} />
        </Wrapper>
    )
}

export default page;
