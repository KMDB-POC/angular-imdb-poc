export interface ApiResponse<T> {
  ok: boolean;
  description: T;
  error_code: number;
}
