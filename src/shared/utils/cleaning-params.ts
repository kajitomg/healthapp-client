import isEmptyParam from "./is-empty-param.ts";
import {ParamsType} from "../models";

export default function cleaningParams(params:ParamsType):ParamsType{
  const result:ParamsType = {}
  const keysParams: string[] = Object.keys(params)
  for (const key of keysParams) {
    if(!isEmptyParam(params[key])){
      const nestedParams = params[key]
      const cleanedParams = typeof nestedParams === 'object' && !Array.isArray(nestedParams) ? cleaningParams(nestedParams) : nestedParams
      if(!isEmptyParam(cleanedParams)) {
        result[key] = cleanedParams
      }
      
    }
  }
  return result
}