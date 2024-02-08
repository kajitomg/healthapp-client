import {IUser} from "../../model/user-model.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {userAPI} from "./api.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
  ;
import {
  baseEntitiesState,
  handleFulfilled,
  handlePending,
  handleRejected
} from "../../../../shared/utils/reducer-handlers.ts";


export interface UsersState {
  list:IUser[]
  count:number,
  error:null | FetchBaseQueryError,
  waiting:boolean
}


const initialState: UsersState = {
  list:[],
  error:null,
  count:0,
  waiting:true
}
export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(userAPI.endpoints.loadUsers.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {list:IUser[]}>) => {
        handleFulfilled(state)
        state.list = action.payload.list
      })
      .addMatcher(userAPI.endpoints.loadUsers.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(userAPI.endpoints.loadUsers.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
  },
})

export default usersSlice.reducer;