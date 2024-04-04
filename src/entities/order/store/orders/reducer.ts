import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
import {
  baseEntitiesState,
  handleFulfilled,
  handlePending,
  handleRejected
} from "../../../../shared/utils/reducer-handlers.ts";
import {IOrder} from "../../model/order-model.ts";
import {orderAPI} from "./api.ts";


interface OrdersState {
  list:IOrder[],
  count:number,
  error:null | FetchBaseQueryError,
  waiting:boolean
}

const initialState:OrdersState = {
  list:[],
  error:null,
  count:0,
  waiting:true
}

const ordersSlice = createSlice({
  name:'order',
  initialState,
  reducers: {
    clearState: (state) => {
      state.list = []
      state.error = null
      state.count = 0
      state.waiting = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(orderAPI.endpoints.loadOrders.matchFulfilled, (state, action: PayloadAction<baseEntitiesState & {list:IOrder[]}>) => {
        handleFulfilled(state)
        state.list = action.payload.list
        state.count = action.payload.count || 0
      })
      .addMatcher(orderAPI.endpoints.loadOrders.matchPending, (state) => {
        handlePending(state)
      })
      .addMatcher(orderAPI.endpoints.loadOrders.matchRejected, (state, action) => {
        handleRejected(state,action)
      })
  },
})


export default ordersSlice.reducer;

export const ordersActionsList = ordersSlice.actions

