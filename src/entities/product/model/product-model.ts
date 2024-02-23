import {IImage} from "../../image/model/image-model.ts";
import {IDocument} from "../../document/model/document-model.ts";
import {ISpecification} from "./specification-model.ts";
import {ICategory} from "./category-model.ts";
import {ModelType, SortTypes} from "../../../shared/models";
import {ParamsType} from "../../../shared/models";

export interface IProduct extends ModelType  {
  name: string,
  article: string,
  price: number,
  discount: number,
  description: string,
  imageId: number,
  count:number,
  images?:IImage[],
  documents?:IDocument[]
  specifications?:ISpecification[],
  categories?:ICategory[]
}

export type IProductUpdate = Pick<IProduct, 'id' | 'name' | 'imageId'>
export type IProductCreate = Partial<IProduct>
export type IProductRequest = Pick<IProduct, 'id'>

export type ProductsParams = ParamsType & productsSortParamsTypes & productsSearchParamsTypes

export type productsSortParamsTypes = {
  'sort[id]': SortTypes,
  'sort[name]': SortTypes,
  'sort[article]': SortTypes,
  'sort[price]': SortTypes,
  'sort[description]': SortTypes,
  'sort[discount]': SortTypes,
}

export type productsSearchParamsTypes = {
  'search[id]':string,
  'search[name]':string,
  'search[article]':string,
  'search[price]':string,
  'search[description]':string,
  'search[discount]':string,
}