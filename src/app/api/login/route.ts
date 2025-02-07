import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.resolve(process.cwd(), 'src', 'utils', 'api', 'oTeuArquivoFake.json');

export async function GET(): Promise<NextResponse> {
    try {
        const jsonData = await fs.readFile(filePath, 'utf-8');

        const data = JSON.parse(jsonData);

        return NextResponse.json({ data, status: 200 });

    } catch (error) {
        return NextResponse.json({ mensagem: 'Erro ao ler o arquivo.' }, {
            status: 500,
        });
    }
}

export async function POST(request: Request) {
    try {
        const newData = await request.json();

        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);

        data.push(newData);

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

        return NextResponse.json({ mensagem: 'Dados adicionados com sucesso!' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ mensagem: 'Erro ao adicionar os dados.' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { email, newPassword } = await request.json();

        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);

        const user = data.find((user: { email: string }) => user.email === email);

        if (!user) {
            return NextResponse.json({ mensagem: 'Usuário não encontrado.' }, { status: 404 });
        }

        user.password = newPassword;

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

        return NextResponse.json({ mensagem: 'Senha atualizada com sucesso!' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ mensagem: 'Erro ao atualizar a senha.' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { email } = await request.json();

        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);

        const userIndex = data.findIndex((user: { email: string }) => user.email === email);

        if (userIndex === -1) {
            return NextResponse.json({ mensagem: 'Usuário não encontrado.' }, { status: 404 });
        }

        data.splice(userIndex, 1);

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

        return NextResponse.json({ mensagem: 'Usuário removido com sucesso!' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ mensagem: 'Erro ao remover o usuário.' }, { status: 500 });
    }
}
