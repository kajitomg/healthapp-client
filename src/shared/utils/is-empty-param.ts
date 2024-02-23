import {ParamsType} from "../models";

/**
 * Проверка, значение - пустой параметр
 */
export default function isEmptyParam(value: ParamsType[keyof ParamsType]):boolean {
  return value === '' || value === null || value === undefined
}
