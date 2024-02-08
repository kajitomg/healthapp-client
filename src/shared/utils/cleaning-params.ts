import isEmptyParam from "./is-empty-param.ts";
import {ParamsType} from "../../entities/params-controller/models.ts";

export default function cleaningParams(params:ParamsType):ParamsType{
  const result:ParamsType = {}
  const keysParams: string[] = Object.keys(params)
  for (const key of keysParams) {
    if(!isEmptyParam(params[key])){
      result[key] = params[key]
    }
  }
  return result
}