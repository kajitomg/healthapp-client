import {IUser} from "../../model/user-model.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {sessionAPI} from "./api.ts";
import {
  baseEntitiesState,
  handleFulfilled,
  handlePending, handleRejected
} from "../../../../shared/utils/reducer-handlers.ts";



export interface SessionState {
  user: IUser ,
  token: string | null,
  error: null | FetchBaseQueryError,
  exists: boolean,
  waiting: boolean,
}

const initialState: SessionState = {
  user: {} as IUser,
  token: null,
  error: null,
  exists: false,
  waiting: false, // Заменить на true при подключении api
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(sessionAPI.endpoints.signin.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {user:IUser,accessToken:string}>) => {
        handleFulfilled(state)
        state.exists = true
        state.user = action.payload.user
        state.token = action.payload.accessToken
      })
      .addMatcher(sessionAPI.endpoints.signin.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(sessionAPI.endpoints.signin.matchRejected, (state, action) => {
        handleRejected(state,action)
        state.exists = false
      })
      .addMatcher(sessionAPI.endpoints.signout.matchFulfilled, (state) => {
        handleFulfilled(state)
        state.exists = false
        state.user = {} as IUser;
        state.token = null
      })
      .addMatcher(sessionAPI.endpoints.signout.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(sessionAPI.endpoints.signout.matchRejected, (state, action) => {
        handleRejected(state,action)
        state.exists = false
      })
      .addMatcher(sessionAPI.endpoints.refresh.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {user:IUser,accessToken:string}>) => {
        handleFulfilled(state)
        state.exists = true
        state.user = action.payload.user;
        state.token = action.payload.accessToken
      })
      .addMatcher(sessionAPI.endpoints.refresh.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(sessionAPI.endpoints.refresh.matchRejected, (state, action) => {
        handleRejected(state,action)
        state.exists = false
      })
  },
})

export default sessionSlice.reducer;
