export type TModelPagination <T>={
  data: T[] | null
  pagination:{
    currentPage: number
    totalPages: number
    total: number
    pageSize: number
  }
}