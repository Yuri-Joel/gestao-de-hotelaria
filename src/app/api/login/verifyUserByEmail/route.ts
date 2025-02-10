import { NextResponse } from "next/server";
import filePath from "@/utils/api/employee.json";

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const { email } = await request.json();

		if (filePath.find((user) => user.email === email)) {
			return NextResponse.json({ isValid: true, status: 200 });
		}

		return NextResponse.json({
			error: "Usuário não encontrado",
			isValid: false,
			status: 404,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Erro ao ler o arquivo.",
			status: 500,
		});
	}
}
