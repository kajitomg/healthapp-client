import {ModelType} from "../../../shared/models";
import {IProduct} from "../../product/model/product-model.ts";
import {IStatus} from "./status-model.ts";

export interface IOrder extends ModelType  {
  customerId: number,
  phonenumber:string,
  email:string,
  comment:string,
  statusId:number,
  products?:IProduct[],
  status?:IStatus
}
