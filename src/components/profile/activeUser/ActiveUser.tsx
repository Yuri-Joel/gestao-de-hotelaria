import { UserCircleIcon } from "@/assets/Icons/UserIcon";
import { formatCpf } from "@/helpers/formatCPF";

interface IActiveUserProps {
	fullName: string;
	cpf: string;
}

export const ActiveUser = ({ fullName, cpf }: IActiveUserProps) => {
	return (
		<div className="flex gap-1">
			<div className="h-full flex items-center justify-center">
				<UserCircleIcon width={80} height={80} />
			</div>
			<div className="flex flex-col justify-center">
				<h1 className="font-bold">{fullName}</h1>
				<p>{formatCpf(cpf)}</p>
			</div>
		</div>
	);
};
