import {IProduct} from "../../entities/product/model/product-model.ts";

export const addProductsToCart = (newProducts:IProduct[],prevProducts?:IProduct[]) => {
  const products:IProduct[] = [...(prevProducts || []),...newProducts]
  return products.reduce(
    (accumulator:IProduct[], currentValue) => {
      if(!accumulator.find(product => product.id === currentValue.id)){
        const value:IProduct = JSON.parse(JSON.stringify(currentValue))
        const count = value['cart-products']?.[0]?.count
        value['cart-products'] = []
        value['cart-products']?.push({
          count: count || 1
        })
        
        accumulator.push(value)
      }
      return accumulator
    },[])
}