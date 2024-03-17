import {ModelType} from "../../../shared/models";


export interface IOrderProduct extends ModelType  {
  orderId: number,
  productId:number,
  count:number
}