declare type SuccessfulResponse<T> = {
  status: boolean;
  code: number;
} & T;

declare type DataResponse<T> = {
  payload: T;
};

declare type PaginatedData<T> = {
  payload: {
    data: T;
    metadata: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

declare type ErrorResponse = {
  status: boolean;
  code: number;
  message: string;
  errors?: ValidationErrorResponse[];
};

declare type ApiResponse<T> = SuccessfulResponse<T> | ErrorResponse;

type ValidationErrorResponse = { path: "string"; message: "string" };
