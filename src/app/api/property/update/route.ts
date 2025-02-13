import { NextResponse } from 'next/server';
import properties from "@/utils/api/properties.json"
import fs from 'fs';
import path from 'path';

export async function PUT(request: Request): Promise<NextResponse> {

    // Caminho do arquivo JSON
    const filePath = path.join(process.cwd(), "src/utils/api/properties.json"); 

    try {
        const { searchParams } = new URL(request.url);
        const body = await request.json();
        const propertyId = searchParams.get("id");


        if (!propertyId) {
            return NextResponse.json({ error: "Informe o id" }, { status: 400 });
        }

        // Encontrando o índice do item no array
        const propertyIndex = properties.findIndex((property) => property._id === Number(propertyId));

        if (propertyIndex === -1) {
            return NextResponse.json({ error: "Propriedade não encontrada" }, { status: 404 });
        }

        // Atualizando os dados
        properties[propertyIndex] = {
            ...properties[propertyIndex],
            ...body, // Substitui os campos existentes pelos novos
        };

        // Salvando a atualização no arquivo JSON
        fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), "utf-8");

        return NextResponse.json({
            message: "Propriedade atualizada com sucesso!",
            data: properties[propertyIndex],
        });

    } catch (error) {
        console.error("Erro ao atualizar propriedade:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }

}
