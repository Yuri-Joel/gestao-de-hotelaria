export type TModelPagination <T>={
  statusText: string
  pagination: {
    totalPages: number
    currentPage:number
    pageSize: number
    total: number
    }
  data: T[] | null
}