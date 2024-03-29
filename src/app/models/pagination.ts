export interface Pagination {
    pageNumber?: number;
    pageSize?: number;
}

export interface PaginationResponse<T> {
    count : number;
    list : T[];
}