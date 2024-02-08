import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../model/product-model.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
import {
  baseEntitiesState,
  handleFulfilled,
  handlePending,
  handleRejected
} from "../../../../shared/utils/reducer-handlers.ts";
import {productAPI} from "./api.ts";


interface ProductsState {
  list:IProduct[],
  count:number,
  error:null | FetchBaseQueryError,
  waiting:boolean
}

const initialState:ProductsState = {
  list:[],
  error:null,
  count:0,
  waiting:true
}

const productsSlice = createSlice({
  name:'product',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addMatcher(productAPI.endpoints.loadProducts.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {list:IProduct[]}>) => {
        handleFulfilled(state)
        state.list = action.payload.list
        state.count = action.payload.count || 0
      })
      .addMatcher(productAPI.endpoints.loadProducts.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(productAPI.endpoints.loadProducts.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
  },
})


export default productsSlice.reducer;

