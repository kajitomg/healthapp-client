import {ModelType} from "../../../shared/models";

export interface ICartProduct extends ModelType  {
  cartId: number,
  productId?: number,
  count?:number
}
