import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {typeAPI} from "./api.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
  ;
import {
  baseEntitiesState,
  handleFulfilled,
  handlePending,
  handleRejected
} from "../../../../shared/utils/reducer-handlers.ts";
import {IType} from "../../model/type-model.ts";


export interface TypesState {
  list:IType[]
  count:number,
  error:null | FetchBaseQueryError,
  waiting:boolean
}


const initialState: TypesState = {
  list:[],
  error:null,
  count:0,
  waiting:true
}
export const typesSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(typeAPI.endpoints.loadTypes.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {list:IType[]}>) => {
        handleFulfilled(state)
        state.list = action.payload.list
      })
      .addMatcher(typeAPI.endpoints.loadTypes.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(typeAPI.endpoints.loadTypes.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
  },
})

export default typesSlice.reducer;