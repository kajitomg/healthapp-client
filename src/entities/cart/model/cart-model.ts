import {ModelType} from "../../../shared/models";
import {IProduct} from "../../product/model/product-model.ts";
import {ICartProduct} from "./cart-product-model.ts";

export interface ICart extends ModelType  {
  userId: number,
  products?: IProduct[],
  'cart-product'?:Partial<ICartProduct>
}
