import Link from "next/link"

export default function SquareNav() {

  const navigationItems = [
    { title: "Andares", href: "/andares" },
    { title: "Quartos", href: "/quartos" },
    { title: "Empresas", href: "/empresas" },
    { title: "Hóspedes", href: "/hospedes" },
    { title: "Agências", href: "/agencias" },
    { title: "Formas de pagamento", href: "/pagamentos" },
    { title: "PDV", href: "/pdv" },
    { title: "Produtos", href: "/produtos" },
  ]

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <div className="bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_10px_rgba(0,0,0,0.8)] transition-shadow duration-300 cursor-pointer">
              <div className="flex items-center justify-center p-6">
                <h2 className="text-lg font-medium text-center text-gray-900">{item.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

