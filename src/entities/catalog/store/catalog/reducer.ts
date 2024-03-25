import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  baseEntitiesState,
  handleFulfilled,
  handlePending,
  handleRejected
} from "../../../../shared/utils/reducer-handlers.ts";
import {catalogAPI} from "./api.ts";
import {ICategory} from "../../../product/model/category-model.ts";
import {IProduct} from "../../../product/model/product-model.ts";


export interface PricesRange {
  min:number,
  max:number
}

interface CatalogState {
  category:baseEntitiesState & {item:ICategory} | null,
  products:baseEntitiesState & {list:IProduct[]} | null,
  pricesRange:PricesRange | null,
  error:null | FetchBaseQueryError,
  waiting:boolean
}

const initialState: CatalogState = {
  category:null,
  products:null,
  pricesRange:null,
  error:null,
  waiting:true
}

const catalogSlice = createSlice({
  name:'catalog',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addMatcher(catalogAPI.endpoints.loadCatalogCategory.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:ICategory}>) => {
        handleFulfilled(state)
        state.category = action.payload
      })
      .addMatcher(catalogAPI.endpoints.loadCatalogCategory.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(catalogAPI.endpoints.loadCatalogCategory.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
      
      
      .addMatcher(catalogAPI.endpoints.loadCatalogProducts.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {list:IProduct[]}>) => {
        handleFulfilled(state)
        state.products = action.payload
      })
      .addMatcher(catalogAPI.endpoints.loadCatalogProducts.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(catalogAPI.endpoints.loadCatalogProducts.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
      
      
      .addMatcher(catalogAPI.endpoints.loadPricesRange.matchFulfilled, (state, action: PayloadAction<{item:PricesRange}>) => {
        handleFulfilled(state)
        state.pricesRange = action.payload.item
      })
      .addMatcher(catalogAPI.endpoints.loadPricesRange.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(catalogAPI.endpoints.loadPricesRange.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
  },
})

export default catalogSlice.reducer;