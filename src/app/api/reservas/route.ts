import { NextResponse } from 'next/server';
import filePath from "@/utils/api/reserve.json"


export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filePath.slice(startIndex, endIndex);

    const totalItems = filePath.length;
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({ data: {
        page,
        limit,
        totalItems,
        totalPages,
        data: paginatedItems,
        dataSearch: filePath
    }
    });
  }
