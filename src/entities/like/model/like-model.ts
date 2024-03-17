import {ModelType} from "../../../shared/models";
import {IProduct} from "../../product/model/product-model.ts";
import {ILikeProduct} from "./like-product-model.ts";

export interface ILike extends ModelType  {
  userId: number,
  products?: IProduct[],
  'like-product'?:Partial<ILikeProduct>
}
