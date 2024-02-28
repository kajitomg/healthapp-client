import {IProduct} from "../../entities/product/model/product-model.ts";

const filterNullCost = (list:IProduct[]) => {
  return [...list].filter((a) => a.price !== null && a.discount !== null)
}

export {filterNullCost}