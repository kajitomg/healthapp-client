import {IProduct} from "../../entities/product/model/product-model.ts";

export const incrementProductInCart = (product?:IProduct,prevProducts?:IProduct[]) => {
  
  return prevProducts?.map((prevProduct) => {
    if(prevProduct.id === product?.id){
      prevProduct['cart-products']?.[0]?.count && prevProduct['cart-products'][0].count++
    }
    return prevProduct
  })
}