import {IProduct} from "../../entities/product/model/product-model.ts";

export const deleteProductsFromCart = (deleteProducts:IProduct[],prevProducts:IProduct[]) => {
  
  return prevProducts.filter(product => {
    return !deleteProducts.find(value => value.id === product.id);
  })
}