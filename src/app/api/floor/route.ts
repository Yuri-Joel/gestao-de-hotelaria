import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    try {
        const filePath = path.resolve(process.cwd(), 'src', 'utils', 'api', 'floor-api.json');

        const jsonData = await fs.readFile(filePath, 'utf-8');

        const data = JSON.parse(jsonData);

        return NextResponse.json({ data, status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: 'Erro ao ler o arquivo.',
            status: 500,
        });
    }
}
