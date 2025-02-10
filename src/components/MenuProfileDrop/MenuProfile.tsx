"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import MenuProfileStore from "@/store/MenuProfile";
import { modalManagementStore } from "@/store/modalManagementStore";

export const MenuProfile = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { handleOpenDropdownProfile, state } = MenuProfileStore();
  const { handleOpenAlertDialogConfirmLogout } = modalManagementStore();

  const router = useRouter();
  const slug = "hotel-ao"
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {

        handleOpenDropdownProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [state]);

  const handleNavigate = (path: string) => {
    handleOpenDropdownProfile(false);
    router.push(`/${slug}${path}`);
  };

  return (
    <div
      className={`fixed top-[4.3rem] right-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-transform duration-200 ${state ? "scale-100" : "scale-0"
        }`}
      ref={dropdownRef}
    >
      {/* Dropdown Content */}
      {state && (
        <ul className="py-2">
          <li>
            <button
              onClick={() => handleNavigate("/home-ao/perfil")}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Minha Conta
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/settings")}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Configurações
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                handleOpenDropdownProfile(false);
                handleOpenAlertDialogConfirmLogout()
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
            >
              Sair
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
