import SquareNav, { SquareNavItem } from "@/components/SquareNav/SquareNav";
import { Wrapper } from "@/components/Wrapper";

const page: React.FC = () => {

   const slug = "hotel-ao"
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

  return <Wrapper title="CADASTRO - INICIO" children={<SquareNav navigationItems={navigationItems}/>} />
}

export default page;
