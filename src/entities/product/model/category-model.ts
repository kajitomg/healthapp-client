import {ParamsType} from "../../../shared/models";
import {ModelType, SortTypes} from "../../../shared/models";
import {IProduct} from "./product-model.ts";

export interface ICategory extends ModelType {
  name: string,
  levelId: string,
  childrens: ICategory[],
  products:IProduct[]
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