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
  waiting: true,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(sessionAPI.endpoints.signin.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:IUser,accessToken:string}>) => {
        handleFulfilled(state)
        state.exists = true
        state.user = action.payload.item
        state.token = action.payload.accessToken
      })
      .addMatcher(sessionAPI.endpoints.signin.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(sessionAPI.endpoints.signin.matchRejected, (state, action) => {
        handleRejected(state,action)
        state.exists = false
      })
      
      .addMatcher(sessionAPI.endpoints.signup.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:IUser,accessToken:string}>) => {
        handleFulfilled(state)
        state.exists = true
        state.user = action.payload.item
        state.token = action.payload.accessToken
      })
      .addMatcher(sessionAPI.endpoints.signup.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(sessionAPI.endpoints.signup.matchRejected, (state, action) => {
        handleRejected(state,action)
        state.exists = false
      })
      
      .addMatcher(sessionAPI.endpoints.signout.matchFulfilled, (state) => {
        handleFulfilled(state)
        state.exists = false
        state.user = {} as IUser;
        state.token = null
        localStorage.removeItem('token')
        localStorage.removeItem('cartItems');
      })
      .addMatcher(sessionAPI.endpoints.signout.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(sessionAPI.endpoints.signout.matchRejected, (state, action) => {
        handleRejected(state,action)
        state.exists = false
      })
      
      .addMatcher(sessionAPI.endpoints.refresh.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {item:IUser,accessToken:string}>) => {
        handleFulfilled(state)
        //const prevCartProducts = window.localStorage.getItem('cart')
        //const {data} = useLoadCartQuery({
        //  id:action.payload.user.id,
        //  params:{
        //    'include[product]':''
        //  }
        //})
        state.exists = true
        state.user = action.payload.item;
        state.token = action.payload.accessToken
        //window.localStorage.setItem('cart',merge(prevCartProducts,data?.item.products))
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


