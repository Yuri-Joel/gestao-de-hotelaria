"use client"
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { NavIcon } from '@/assets/Icons/Header/navIcon';
import sideBarStateStore from '@/store/sideBarStateStore';
import { UserCircleIcon } from '@/assets/Icons/UserIcon';
import { MagnifieIcon } from '@/assets/Icons/MagnifierIcon';
import ReserveSearchStore from '@/store/ReserveSearchStore';

export const Header = () => {
  const pathname = usePathname();
  const slug = "hotel-ao"
  const { changeSideBarState, state } = sideBarStateStore();
  const { handleOpenReserveSearch, state: stateOpen } = ReserveSearchStore()

  const toggleSidebar = () => {
    changeSideBarState(!state);
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-[65px] px-5 text-black flex justify-between items-center bg-white border-b">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
          <NavIcon stroke='black' />
        </button>
        <Link href="/">
          <h1 className="">Hoteli Apps - PMS</h1>
        </Link>
      </div>
      <nav className='flex gap-5'>
        <Link
          href="propriedades"
        >
          Selecionar Propriedade
        </Link>
        {pathname && ["home", "reservas", "quartos"].includes(pathname.split('/').pop()!) && (
          <Link href="#" onClick={() => handleOpenReserveSearch(!stateOpen)}>
            <MagnifieIcon width={50} height={30} stroke="black" />
          </Link>
        )}

        <Link
          href="#"
          className=" text-black"
        >
          <UserCircleIcon width={50} height={30} />
        </Link>
      </nav>
    </header>
  );
};