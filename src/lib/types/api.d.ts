declare type SuccessfulResponse<T> = {
  message: string;
} & T;

declare type DataResponse<T> = {
  payload: {
    data: T;
  };
};

declare type PaginatedData<T> = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
} & T;

declare type ErrorResponse = {
  error: string;
  errors?: ValidationErrorResponse[];
};

declare type ApiResponse<T> = SuccessfulResponse<T> | ErrorResponse;

type ValidationErrorResponse = { path: "string"; message: "string" };
