import {ModelType, SortTypes} from "../../../shared/models";
import {ParamsType} from "../../params-controller/models.ts";


export interface ISpecification extends ModelType  {
  name: string,
  basic: boolean,
  categoryId: number;
  typeId: number;
}

export type ISpecificationUpdate = Pick<ISpecification, 'id' | 'name' | 'basic' | 'categoryId' | 'typeId'>
export type ISpecificationCreate = Partial<ISpecification>
export type ISpecificationRequest = Pick<ISpecification, 'id'>

export type SpecificationsParams = ParamsType & specificationsSortParamsTypes & specificationsSearchParamsTypes

export type specificationsSortParamsTypes = {
  'sort[id]': SortTypes,
  'sort[value]': SortTypes,
  'sort[basic]': SortTypes,
  'sort[categoryId]': SortTypes,
  'sort[typeId]': SortTypes,
}

export type specificationsSearchParamsTypes = {
  'search[id]':string,
  'search[value]':string,
  'search[basic]':string,
  'search[categoryId]':string,
  'search[typeId]':string,
}