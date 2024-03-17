import {IProduct} from "../../entities/product/model/product-model.ts";

export const addProductsToLike = (newProducts:IProduct[],prevProducts:IProduct[]) => {

  const products:IProduct[] = [...prevProducts,...newProducts]
  
  return products.reduce(
    (accumulator:IProduct[], currentValue) => {
      if(!accumulator.find(product => product.id === currentValue.id)){
        accumulator.push(currentValue)
      }
      return accumulator
    },[])
}