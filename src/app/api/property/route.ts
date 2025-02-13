import { NextResponse } from 'next/server';
import filePath from "@/utils/api/properties.json"

export async function GET(): Promise<NextResponse> {
    
    return NextResponse.json({
        data: filePath,
    })
        
}
