export type TModelPagination <T>={
    page: number
    limit: number
    totalItems: number
    totalPages: number
    data: T[] | null
}