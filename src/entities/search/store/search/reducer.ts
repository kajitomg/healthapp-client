import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  baseEntitiesState, handleFulfilled, handlePending, handleRejected,
} from "../../../../shared/utils/reducer-handlers.ts";
import {ICategory} from "../../../product/model/category-model.ts";
import {IProduct} from "../../../product/model/product-model.ts";
import {searchAPI} from "./api.ts";


interface SearchState {
  categories:baseEntitiesState & {list:ICategory[]} | null,
  products:baseEntitiesState & {list:IProduct[]} | null,
  error:null | FetchBaseQueryError,
  waiting:boolean
}

const initialState: SearchState = {
  categories:null,
  products:null,
  error:null,
  waiting:true
}

const searchSlice = createSlice({
  name:'search',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addMatcher(searchAPI.endpoints.searchProducts.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {list:IProduct[]}>) => {
        handleFulfilled(state)
        state.products = action.payload
      })
      .addMatcher(searchAPI.endpoints.searchProducts.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(searchAPI.endpoints.searchProducts.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
      
      
      .addMatcher(searchAPI.endpoints.searchCategories.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {list:ICategory[]}>) => {
        handleFulfilled(state)
        state.categories = action.payload
      })
      .addMatcher(searchAPI.endpoints.searchCategories.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(searchAPI.endpoints.searchCategories.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
  },
})

export default searchSlice.reducer;