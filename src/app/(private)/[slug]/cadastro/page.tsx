import SquareNav, { SquareNavItem } from "@/components/SquareNav/SquareNav";
import { Wrapper } from "@/components/Wrapper";
import Cookies from "js-cookie";

const page: React.FC = () => {
  const slug = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_SLUG}`)

  const navigationItems: SquareNavItem[] = [
    { title: "Andares", href: `/${slug}/cadastro/andares` },
    { title: "Quartos", href: `/${slug}/cadastro/quartos` },
    { title: "Empresas", href: `/${slug}/cadastro/empresas` },
    { title: "Hóspedes", href: `/${slug}/cadastro/hospedes` },
    { title: "Agências", href: `/${slug}/cadastro/agencias` },
    { title: "Formas de pagamento", href: `/${slug}/cadastro/pagamentos` },
    { title: "PDV", href: `/${slug}/cadastro/pdv` },
    { title: "Produtos", href: `/${slug}/cadastro/produtos` },
  ]

  return <Wrapper title="CADASTRO - INICIO" children={<SquareNav navigationItems={navigationItems} />} />
}

export default page;
