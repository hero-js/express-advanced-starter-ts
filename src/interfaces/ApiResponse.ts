namespace IResponse {
  export interface BaseResponse  extends Record<string, any>{
    statusCode: number;
    status: 'error' | 'success';
    message: string;
  }

  export interface SimpleError extends BaseResponse {
    status: 'error';
    errorType: 'simple';
  }

  export interface FieldError extends BaseResponse {
    errorType: 'field';
    message: string;
    errors: Array<{
      field: string;
      message: string;
    }>;
  }

  export interface Pagination {
    current: number;
    total: number;
    perPage: number;
  }

  export interface MetaData {
    [key: string]: any;
  }

  export interface SuccessResponse<T> extends BaseResponse {
    status: 'success';
    data: Array<T>;
    pagination?: Pagination;
    metaData?: MetaData;
  }

  export type ApiResponse<T> = SimpleError | FieldError | SuccessResponse<T>;
}

export default IResponse;
