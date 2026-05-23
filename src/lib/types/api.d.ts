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
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} & T;

declare type ErrorResponse = {
  error: string;
  errors?: ValidationErrorResponse[];
};

declare type ApiResponse<T> = SuccessfulResponse<T> | ErrorResponse;

type ValidationErrorResponse = { path: "string"; message: "string" };
