import Link from "next/link"

export interface SquareNavItem {
  title: string;
  href: string;
}

interface SquareNavProps {
  navigationItems: SquareNavItem[];
}

export default function SquareNav({ navigationItems }: SquareNavProps) {
  

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

