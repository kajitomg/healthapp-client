import {ModelType, SortTypes} from "../../../shared/models";
import {ParamsType} from "../../../shared/models";


export interface IValue extends ModelType  {
  value: string,
  basic: boolean,
}

export type IValueUpdate = Pick<IValue, 'id' | 'value' | 'basic'>
export type IValueCreate = Partial<IValue>
export type IValueRequest = Pick<IValue, 'id'>

export type ValuesParams = ParamsType & valuesSortParamsTypes & valuesSearchParamsTypes

export type valuesSortParamsTypes = {
  'sort[id]': SortTypes,
  'sort[value]': SortTypes,
  'sort[basic]': SortTypes,
}

export type valuesSearchParamsTypes = {
  'search[id]':string,
  'search[value]':string,
  'search[basic]':string,
}