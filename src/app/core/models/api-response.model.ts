export interface ApiResponse<T> {
  page: boolean;
  description: T;
  error_code: number;
}
