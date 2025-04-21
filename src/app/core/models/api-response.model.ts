export interface ApiResponse<T> {
  statusCode: number;
  succeeded: boolean;
  result: T;
  errors: string[];
  message: string;
}
