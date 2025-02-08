"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfilePageLayout = ({ children }: { children: React.ReactNode }) => {
	const path = usePathname().split("/").reverse()[0];
	return (
		<div className="min-h-full min-w-full p-4">
			<h1 className="text-2xl font-bold pl-3">Perfil</h1>
			<div className="w-full flex gap-4 bg-white rounded-sm shadow-sm border-b">
				<Link
					href={"/home-ao/perfil"}
					className="flex rounded-sm hover:bg-black/20 w-20 h-14 items-center justify-center font-bold flex-col px-2 mb-1"
				>
					<span className="flex h-full items-center justify-center">
						Geral
					</span>
					{path === "perfil" && (
						<span className="bg-primary flex w-full h-[10%] rounded-lg"></span>
					)}
				</Link>
				<Link
					href={"/home-ao/perfil/privacidade"}
					className="flex rounded-sm hover:bg-black/20 w-fit h-14 items-center justify-center font-bold flex-col px-2 mb-1"
				>
					<span className="flex h-full items-center justify-center gap-2">
						Privacidade e Segurança
					</span>
					{path === "privacidade" && (
						<span className="bg-primary flex w-full h-[10%] rounded-lg"></span>
					)}
				</Link>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default ProfilePageLayout;
