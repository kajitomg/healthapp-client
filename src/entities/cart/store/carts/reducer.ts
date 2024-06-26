import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cartAPI} from "./api.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
  ;
import {
  baseEntitiesState,
  handleFulfilled,
  handlePending,
  handleRejected
} from "../../../../shared/utils/reducer-handlers.ts";
import {ICart} from "../../model/cart-model.ts";
import {IProduct} from "../../../product/model/product-model.ts";

export interface CartsState {
  item: ICart | null,
  products:baseEntitiesState & {list?:IProduct[]} & {
    error:null | FetchBaseQueryError,
    waiting:boolean
  },
  count:number,
  error:null | FetchBaseQueryError,
  waiting:boolean
}


const initialState: CartsState = {
  item:null,
  products:{
    error:null,
    waiting:false
  },
  error:null,
  count:0,
  waiting:true
}
export const cartsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearState: (state) => {
      state.item = null
      state.products = {
        error:null,
        waiting:false
      }
      state.error = null
      state.count = 0
      state.waiting = false
    },
    
    replaceProductsState: (state, action:PayloadAction<baseEntitiesState & {products?:IProduct[],error?:null | FetchBaseQueryError,waiting?:boolean}>) => {
      const {products,error,waiting, count} = action.payload

      if(products !== undefined) state.products.list = products
      if(error !== undefined) state.products.error = error
      if(waiting !== undefined) {
        state.products.waiting = waiting
        state.waiting = waiting
      }
      if(count !== undefined) state.products.count = count
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(cartAPI.endpoints.loadCart.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:ICart}>) => {
        const {item} = action.payload
        handleFulfilled(state)
        state.item = item
      })
      .addMatcher(cartAPI.endpoints.loadCart.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(cartAPI.endpoints.loadCart.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
      
      .addMatcher(cartAPI.endpoints.addProductsToCart.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:ICart}>) => {
        const {item} = action.payload
        handleFulfilled(state)
        state.item = item
      })
      .addMatcher(cartAPI.endpoints.addProductsToCart.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(cartAPI.endpoints.addProductsToCart.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
      
      .addMatcher(cartAPI.endpoints.deleteProductsFromCart.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:ICart}>) => {
        const {item} = action.payload
        handleFulfilled(state)
        state.item = item
      })
      .addMatcher(cartAPI.endpoints.deleteProductsFromCart.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(cartAPI.endpoints.deleteProductsFromCart.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
      
      .addMatcher(cartAPI.endpoints.incrementProductInCart.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:ICart}>) => {
        const {item} = action.payload
        handleFulfilled(state)
        state.item = item
      })
      .addMatcher(cartAPI.endpoints.incrementProductInCart.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(cartAPI.endpoints.incrementProductInCart.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
      
      .addMatcher(cartAPI.endpoints.decrementProductInCart.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:ICart}>) => {
        const {item} = action.payload
        handleFulfilled(state)
        state.item = item
      })
      .addMatcher(cartAPI.endpoints.decrementProductInCart.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(cartAPI.endpoints.decrementProductInCart.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
  },
})

export default cartsSlice.reducer;

export const cartsActionsList = cartsSlice.actions
