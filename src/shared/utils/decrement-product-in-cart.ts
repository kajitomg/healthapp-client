import {IProduct} from "../../entities/product/model/product-model.ts";

export const decrementProductInCart = (product?:IProduct,prevProducts?:IProduct[]) => {
  
  return prevProducts?.filter((prevProduct) => {
    if(prevProduct.id === product?.id){
      prevProduct['cart-products']?.[0]?.count && prevProduct['cart-products'][0].count--
      return prevProduct['cart-products']?.[0]?.count !== 0;
      
    }
    return true
  })
}