import {ParamsType} from "../../params-controller/models.ts";
import {ModelType, SortTypes} from "../../../shared/models";

export interface ICategory extends ModelType {
  name: string,
}

export type ICategoryUpdate = Pick<ICategory, 'id' | 'name'>
export type ICategoryCreate = Partial<ICategory>
export type ICategoryRequest = Pick<ICategory, 'id'>

export type CategoriesParams = ParamsType & categoriesSortParamsTypes & categoriesSearchParamsTypes

export type categoriesSortParamsTypes = {
  'sort[id]': SortTypes,
  'sort[name]': SortTypes,
}

export type categoriesSearchParamsTypes = {
  'search[id]':string,
  'search[name]':string,
}