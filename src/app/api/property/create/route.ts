import { NextResponse } from 'next/server';
import properties from "@/utils/api/properties.json"
import fs from 'fs';
import path from 'path';

export async function POST(request: Request): Promise<NextResponse> {

    // Caminho do arquivo JSON
    const filePath = path.join(process.cwd(), "src/utils/api/properties.json"); 

    try {
        const body = await request.json();

        // Adiciona nova propriedade os dados
        properties.push(body)
        // Salvando a atualização no arquivo JSON
        fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), "utf-8");

        return NextResponse.json({
            message: "Propriedade criada com sucesso!",
        });

    } catch (error) {
      return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }

}
