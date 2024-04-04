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
import {IProduct} from "../../../product/model/product-model.ts";
import {RootState} from "../../../../shared/services/redux/model.ts";
import {ILike} from "../../model/like-model.ts";

export interface LikesState {
  item:Partial<ILike> | null
  products:baseEntitiesState & {list?:IProduct[]} & {
    error:null | FetchBaseQueryError,
    waiting:boolean
  },
  count:number,
  error:null | FetchBaseQueryError,
  waiting:boolean
}


const initialState: LikesState = {
  item:null,
  products:{
    error:null,
    waiting:false
  },
  error:null,
  count:0,
  waiting:true
}
export const likesSlice = createSlice({
  name: 'like',
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
      .addMatcher(cartAPI.endpoints.loadLike.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:ILike}>) => {
        const {item} = action.payload
        handleFulfilled(state)
        state.item = item
      })
      .addMatcher(cartAPI.endpoints.loadLike.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(cartAPI.endpoints.loadLike.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
      
      .addMatcher(cartAPI.endpoints.addProductsToLike.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:ILike}>) => {
        const {item} = action.payload
        handleFulfilled(state)
        state.item = item
      })
      .addMatcher(cartAPI.endpoints.addProductsToLike.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(cartAPI.endpoints.addProductsToLike.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
      
      .addMatcher(cartAPI.endpoints.deleteProductsFromLike.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:ILike}>) => {
        const {item} = action.payload
        handleFulfilled(state)
        state.item = item
      })
      .addMatcher(cartAPI.endpoints.deleteProductsFromLike.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(cartAPI.endpoints.deleteProductsFromLike.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
      
    
  },
})

export default likesSlice.reducer;

export const likesActionsList = likesSlice.actions

export const getProductsFromLike = (state: RootState):IProduct[] => {
  if(state.like?.item?.products){
    return state.like?.item?.products
  } else {
    return JSON.parse(localStorage.getItem('likeItems') || JSON.stringify([]))
  }
}