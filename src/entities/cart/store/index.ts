
import { default as cartReducers} from './carts/reducer.ts';
import {cartsActionsList} from "./carts/reducer.ts";

const cartState = {
  cart:cartReducers
}
const cartActions = {
  cart:cartsActionsList,
}

export {cartState,cartActions}