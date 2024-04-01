import {ParamsType} from "../models";

/**
 * Проверка, значение - пустой параметр
 */
export default function isEmptyParam(value: ParamsType[keyof ParamsType]):boolean {
  if(typeof value === 'object' && !Array.isArray(value)) return !Object.keys(value).length
  
  return value === '' || value === null || value === undefined
}
