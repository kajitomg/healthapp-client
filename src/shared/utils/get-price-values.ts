import {sortCost} from "./sortCost.ts";
import {filterNullCost} from "./filterNullCost.ts";
import {IProduct} from "../../entities/product/model/product-model.ts";

const getPriceValues = (list:IProduct[]) => {
  const costs = sortCost(filterNullCost(list))
  return {
    min:costs[0]?.discount || costs[0]?.price || 0,
    max:costs[costs.length - 1]?.discount || costs[costs.length - 1]?.price || 0
  }
}

export {getPriceValues}