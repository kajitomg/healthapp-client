import {IUser} from "../../model/user-model.ts";
import {createSlice} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
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
  
  },
})

export default usersSlice.reducer;