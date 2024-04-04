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
  category:{item?:ICategory}  & {
    error:null | FetchBaseQueryError,
    waiting:boolean
  },
  products:baseEntitiesState & {list?:IProduct[]} & {
    error:null | FetchBaseQueryError,
    waiting:boolean,
    pricesRange:PricesRange | null,
  },
  error:null | FetchBaseQueryError,
  waiting:boolean
}

const initialState: CatalogState = {
  category:{
    error:null,
    waiting:false
  },
  products:{
    error:null,
    waiting:false,
    pricesRange:{min:0,max:0}
  },
  error:null,
  waiting:false
}

const catalogSlice = createSlice({
  name:'catalog',
  initialState,
  reducers:{
    
    replaceCategoryState: (state, action:PayloadAction<{category?:ICategory ,error?:null | FetchBaseQueryError,waiting?:boolean,clear?:boolean}>) => {
      const {category,error,waiting, clear} = action.payload
      
      if(category !== undefined) state.category.item = category
      if(error !== undefined) state.category.error = error
      if(waiting !== undefined) {
        state.category.waiting = waiting
        state.waiting = waiting
      }
      if(clear) state.products = {
        error:state.products.error,
        waiting:state.products.waiting,
        pricesRange:state.products.pricesRange
      }
    },
    
    replaceProductsState: (state, action:PayloadAction<baseEntitiesState & {products?:IProduct[],error?:null | FetchBaseQueryError,waiting?:boolean,pricesRange?:PricesRange,clear?:boolean}>) => {
      const {products,error,waiting, count, pricesRange, clear} = action.payload
      
      if(products !== undefined) state.products.list = products
      if(error !== undefined) state.products.error = error
      if(waiting !== undefined) {
        state.products.waiting = waiting
        state.waiting = waiting
      }
      if(count !== undefined) state.products.count = count
      if(pricesRange !== undefined) state.products.pricesRange = pricesRange
      
      if(clear) state.category = {
        waiting:state.category.waiting,
        error:state.category.error
      }
    }
    
  },
  extraReducers: (builder) => {
    builder
      
      .addMatcher(catalogAPI.endpoints.loadPricesRange.matchFulfilled, (state, action: PayloadAction<{item:PricesRange}>) => {
        handleFulfilled(state)
        state.products.pricesRange = action.payload.item
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

export const catalogActionsList = catalogSlice.actions