export interface ApiErrorResponse {
  message: string,
  errors: {[k: string]: string[]}
}

export interface ApiOptions {
  onSuccess?:() => void,
  onError?:() => void,
}