export interface MetaPagination {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export class PaginatedResponse<T> {
  data: T[];
  meta: MetaPagination;

  constructor(data: T[], totalItems: number, page: number, limit: number) {
    this.data = data;

    this.meta = {
      totalItems,
      itemCount: data.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  }
}
