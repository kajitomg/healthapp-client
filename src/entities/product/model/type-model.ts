import {ModelType, SortTypes} from "../../../shared/models";
import {ParamsType} from "../../../shared/models";


export interface IType extends ModelType  {
  value: string,
  basic: boolean,
}

export type ITypeUpdate = Pick<IType, 'id' | 'value' | 'basic'>
export type ITypeCreate = Partial<IType>
export type ITypeRequest = Pick<IType, 'id'>

export type TypesParams = ParamsType & typesSortParamsTypes & typesSearchParamsTypes

export type typesSortParamsTypes = {
  'sort[id]': SortTypes,
  'sort[value]': SortTypes,
  'sort[basic]': SortTypes,
}

export type typesSearchParamsTypes = {
  'search[id]':string,
  'search[value]':string,
  'search[basic]':string,
}