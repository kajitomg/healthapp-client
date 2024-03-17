import {IProduct} from "../../entities/product/model/product-model.ts";
import {getProductCartCount} from "./get-product-cart-count.ts";

export const getTotalPrice = (products?:IProduct[],withCount:boolean = true) => {
  let total = 0
  
  products?.map((product) => {
    total += (product.discount || product.price || 0) * (withCount ? (getProductCartCount(product) || 1): 1)
  })
  
  return total
}