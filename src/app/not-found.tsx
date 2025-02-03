import Link from "next/link";
import { Icon404 } from "@/assets/Icons/Icon404";

export default async function NotFound() {
	return (
		<div className="h-screen flex gap-8 bg-white">
			<div className="h-full w-full flex items-center justify-center">
				<Icon404 />
			</div>
			<div className="h-full w-full flex items-center justify-center flex-col gap-4  mx-auto">
				<div className="flex flex-col gap-4 max-w-[450px]">
					<h2 className="text-violet-900 text-4xl font-semibold">
						Página não encontrada!
					</h2>

					<p className="text-gray-600 text-2xl">
						Desculpe, o link que você tentou acessar não está
						disponível ou foi removido
						<Link className="font-bold ml-4 hover:underline" href={"/"}>
							Clique aqui para voltar
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
