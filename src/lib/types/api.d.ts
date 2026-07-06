declare type SuccessfulResponse<T> = {
  status: true;
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
  status: false;
  code: number;
  message: string;
  errors?: ValidationErrorResponse[];
};

declare type ApiResponse<T> = SuccessfulResponse<T> | ErrorResponse;

type ValidationErrorResponse = { path: "string"; message: "string" };
