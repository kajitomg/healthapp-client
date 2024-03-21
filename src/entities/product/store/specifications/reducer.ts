import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  baseEntitiesState,
  handleFulfilled,
  handlePending,
  handleRejected
} from "../../../../shared/utils/reducer-handlers.ts";
import {specificationAPI} from "./api.ts";
import {ISpecification} from "../../model/specification-model.ts";


interface SpecificationsState {
  list:ISpecification[],
  count:number,
  error:null | FetchBaseQueryError,
  waiting:boolean
}

const initialState: SpecificationsState = {
  list:[],
  count:0,
  error:null,
  waiting:true
}

const specificationsSlice = createSlice({
  name:'specification',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addMatcher(specificationAPI.endpoints.loadSpecifications.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {list:ISpecification[]}>) => {
        handleFulfilled(state)
        state.list = action.payload.list
        state.count = action.payload.count || 0
      })
      .addMatcher(specificationAPI.endpoints.loadSpecifications.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(specificationAPI.endpoints.loadSpecifications.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
  },
})

export default specificationsSlice.reducer;