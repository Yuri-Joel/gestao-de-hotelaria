import Link from "next/link"

export default function SquareNav() {
  const slug = "hotel-ao"

  const navigationItems = [
    { title: "Andares", href: `/${slug}/cadastro/andares` },
    { title: "Quartos", href: `/${slug}/cadastro/quartos` },
    { title: "Empresas", href: `/${slug}/cadastro/empresas` },
    { title: "Hóspedes", href: `/${slug}/cadastro/hospedes` },
    { title: "Agências", href: `/${slug}/cadastro/agencias` },
    { title: "Formas de pagamento", href: `/${slug}/cadastro/pagamentos` },
    { title: "PDV", href: `/${slug}/cadastro/pdv` },
    { title: "Produtos", href: `/${slug}/cadastro/produtos` },
  ]

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <div className="bg-white text-gray-900 hover:text-primary hover:shadow-md hover:shadow-gray-450  border border-gray-90 transition-shadow duration-300 cursor-pointer">
              <div className="flex items-center justify-center p-6">
                <h2 className="text-lg font-medium text-center  ">{item.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

