import {IProduct} from "../../entities/product/model/product-model.ts";

export const getProductOrderCount = (product?:IProduct):number => {
  return product?.['order-product']?.count || 1
}