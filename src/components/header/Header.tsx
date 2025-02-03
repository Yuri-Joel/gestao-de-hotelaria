'use client'
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname(); 
  const slug = "algo"

  return (
    <header className="h-[60px] px-10 flex justify-between items-center bg-gradient-to-r from-[#6100C2] to-[#5954FB]">
      <Link href="/">
        <h1 className='text-white font-bold'>Hoteli Apps - PMS</h1>
      </Link>

      <nav className='flex gap-5'>
        <Link
          href="/propriedade"
          className="text-lg text-white font-semibold"
        >
          Selecionar Propriedade
        </Link>

        {pathname === `/${slug}/reservas` && (
          <Link
            href="#"
            className="text-lg text-white font-semibold"
          >
            Reservas
          </Link>
        )}

        <Link
          href="/perfil"
          className="text-lg text-white font-semibold"
        >
          Perfil
        </Link>
      </nav>
    </header>
  );
};