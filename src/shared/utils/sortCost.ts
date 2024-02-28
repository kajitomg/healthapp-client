import {IProduct} from "../../entities/product/model/product-model.ts";

const sortCost = (list:IProduct[]) => {
  return [...list].sort((a,b) =>
  {
    if(!a.discount && b.discount)
      return a.price - b.discount
    else if(!b.discount && a.discount)
      return a.discount - b.price
    else
      return a.price - b.price
  })
}

export {sortCost}