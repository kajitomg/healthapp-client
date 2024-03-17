import {IProduct} from "../../entities/product/model/product-model.ts";
import {getProductOrderCount} from "./get-product-order-count.ts";

export const getOrderTotalPrice = (products?:IProduct[],withCount:boolean = true) => {
  let total = 0
  
  products?.map((product) => {
    total += (product.discount || product.price || 0) * (withCount ? (getProductOrderCount(product) || 1): 1)
  })
  
  return total
}