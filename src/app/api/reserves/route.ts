import { NextResponse } from 'next/server';
import filePath from "@/utils/api/reserve.json"


export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    //const startDate = searchParams.get("startDate") || new Date();
    // const normalizeMonth = (date: Date) => new Date(date).getMonth(); 
    // const normalizeDate = (date: Date) => new Date(date).getDate();
    // const newStartDate = new Date(startDate);
    // const endDate = new Date(newStartDate);
    // endDate.setMonth(newStartDate.getMonth() + 1)

    if (filePath) {
        // const getReserves: any = [...filePath]
        // const reservesFiltered = getReserves.filter((res: ReserveEntity) => (
        //     (normalizeMonth(res.checkIn) === normalizeMonth(newStartDate) ||
        //     normalizeMonth(res.checkIn) === normalizeMonth(endDate)) && 
        //     (normalizeDate(res.checkIn) >= normalizeDate(newStartDate) &&
        //     normalizeDate(res.checkIn) <= normalizeDate(endDate)) 
        // ))

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedItems = filePath.slice(startIndex, endIndex);

        const totalItems = filePath.length;
        const totalPages = Math.ceil(totalItems / limit);
        
        return NextResponse.json({
            page,
            limit,
            totalItems,
            totalPages,
            data: paginatedItems,
            dataSearch: filePath,
        });
    }

    return NextResponse.next()

}
