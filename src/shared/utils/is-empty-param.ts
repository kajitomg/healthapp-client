import {ParamsType} from "../../entities/params-controller/models.ts";

/**
 * Проверка, значение - пустой параметр
 */
export default function isEmptyParam(value:keyof ParamsType):boolean {
  return value === '' || value === null || value === undefined
}
