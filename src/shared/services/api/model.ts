export interface ApiErrorResponse {
  message: string;
  errors: {[k: string]: string[]}
}