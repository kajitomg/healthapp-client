import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {ICategory} from "../../model/category-model.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  baseEntitiesState,
  handleFulfilled,
  handlePending,
  handleRejected
} from "../../../../shared/utils/reducer-handlers.ts";
import {categoryAPI} from "./api.ts";


interface CategoriesState {
  list:ICategory[],
  count:number,
  error:null | FetchBaseQueryError,
  waiting:boolean
}

const initialState: CategoriesState = {
  list:[],
  count:0,
  error:null,
  waiting:true
}

const categoriesSlice = createSlice({
  name:'category',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addMatcher(categoryAPI.endpoints.loadCategories.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {list:ICategory[]}>) => {
        handleFulfilled(state)
        state.list = action.payload.list
        state.count = action.payload.count || 0
      })
      .addMatcher(categoryAPI.endpoints.loadCategories.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(categoryAPI.endpoints.loadCategories.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
  },
})

export default categoriesSlice.reducer;