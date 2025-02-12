export type TModelPagination <T>={
  pagination: {page: number
    limit: number
    totalItems: number
    totalPages: number
    currentPage:number
    }
  data: T[] | null
  dataSearch?: T[] | null
}