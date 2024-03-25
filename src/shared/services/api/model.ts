import {ParamsType} from "../../models";

export interface ApiErrorResponse {
  message: string,
  errors: Record<string, string[]>
}

export interface ApiOptions {
  onSuccess?:() => void,
  onError?:() => void,
}

export interface ApiProps<
  D extends Record<string, string | number>,
  P extends ParamsType,
  Q extends Record<string, string | number>,
  O extends ApiOptions
> {
  data:D,
  params:P,
  query:Q,
  options:O,
}