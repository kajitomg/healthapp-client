import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {PayloadAction} from "@reduxjs/toolkit";


/*
export type baseEntitiesState<T> = {
  list:T[],
  count?: number
}

export type baseReducerState<T> = {
  list:T[],
  error:null | FetchBaseQueryError,
  waiting:boolean
}

const handleFulfilled = <S extends baseReducerState<T>,T,P extends  PayloadAction<baseEntitiesState<T>>>(state:S, action:P) => {
  state.waiting = false;
  state.error = null;
  state.list = action.payload.list
}

const handlePending = <S extends baseReducerState<T>,T>(state:S) => {
  state.waiting = true;
}

const handleRejected = <S extends baseReducerState<T>,T,P extends  PayloadAction<FetchBaseQueryError | undefined>>(state:S, action:P) => {
  state.waiting = false;
  state.error = action.payload || null;
}
*/

export type baseEntitiesState = {
  count?: number
}

export type baseReducerState = {
  error:null | FetchBaseQueryError,
  waiting:boolean
}

const handleFulfilled = <S extends baseReducerState>(state:S) => {
  state.waiting = false;
  state.error = null;
}

const handlePending = <S extends baseReducerState>(state:S) => {
  state.waiting = true;
}

const handleRejected = <S extends baseReducerState,P extends  PayloadAction<FetchBaseQueryError | undefined>>(state:S, action:P) => {
  state.waiting = false;
  state.error = action.payload || null;
}
export {handleFulfilled,handlePending,handleRejected}

