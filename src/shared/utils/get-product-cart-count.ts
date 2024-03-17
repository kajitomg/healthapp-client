import {IProduct} from "../../entities/product/model/product-model.ts";

export const getProductCartCount = (product?:IProduct):number => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || JSON.stringify([]))
  
  return product?.['cart-products']?.[0]?.count || cartItems.filter((item:IProduct) => item.id === product?.id)[0]?.['cart-products']?.[0]?.count
}