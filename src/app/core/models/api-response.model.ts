export interface ApiResponse<T> {
  statusCode: number;
  succeeded: boolean;
  result: T | null;
  errors: string[];
  message: string | null;
}
