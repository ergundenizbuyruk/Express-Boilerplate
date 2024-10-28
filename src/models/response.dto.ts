export interface ResponseDto<T> {
  data: T | null;
  statusCode: number;
  success: boolean;
  error: ErrorDto | null;
}

export interface ErrorDto {
  errors: string[];
  isShow: boolean;
}

export const successResponse = <T>(
  data: T,
  statusCode: number
): ResponseDto<T> => {
  return {
    data,
    statusCode,
    success: true,
    error: null,
  };
};

export const errorResponse = <T>(
  errors: string[],
  statusCode: number
): ResponseDto<T> => {
  return {
    data: null,
    statusCode,
    success: false,
    error: {
      errors,
      isShow: true,
    },
  };
};
