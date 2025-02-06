import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
    const res = {
        mgs: "Bem-vindo à API da Hoteli Apps - PMS!",
    };

    return NextResponse.json(res, { status: 200 });
}
