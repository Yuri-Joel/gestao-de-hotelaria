import Link from "next/link"

export default function SquareNav() {

  const navigationItems = [
    { title: "Andares", href: "http://localhost:3000/hotel-ao/cadastros/andares" },
    { title: "Quartos", href: "http://localhost:3000/hotel-ao/cadastros/quartos" },
    { title: "Empresas", href: "http://localhost:3000/hotel-ao/cadastros/empresas" },
    { title: "Hóspedes", href: "http://localhost:3000/hotel-ao/cadastros/hospedes" },
    { title: "Agências", href: "http://localhost:3000/hotel-ao/cadastros/agencias" },
    { title: "Formas de pagamento", href: "http://localhost:3000/hotel-ao/cadastros/pagamentos" },
    { title: "PDV", href: "/pdv" },
    { title: "Produtos", href: "/produtos" },
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

