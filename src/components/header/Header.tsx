import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <div className="h-[98px] px-28 flex justify-between items-center bg-gradient-to-r from-[#6100C2] to-[#5954FB]">
      <Link href="/">
        <h1>Hoteli Apps - PMS</h1>
      </Link>
      <Link
        href="#"
        className="text-lg text-white font-semibold"
      >
        <span>Contato</span>
      </Link>
    </div>
  )
}
