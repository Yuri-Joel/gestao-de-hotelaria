export type TModelPagination<T> = {
	statusText: string;
	pagination: {
		total: number;
		totalPages: number;
		currentPage: number;
		pageSize: number;
	};
	data: T[] | null;
};
