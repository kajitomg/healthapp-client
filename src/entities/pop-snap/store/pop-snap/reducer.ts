import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../../shared/services/redux/model.ts";

interface PopSnapElementDataState {
  [name:string]:string | number
}

interface PopSnapElementState {
  isOpen:boolean,
  data:PopSnapElementDataState | null
}

interface PopSnapState {
  [id:string]:PopSnapElementState
}

const initialState:PopSnapState = {}

const popSnapSlice = createSlice({
  name:'popsnap',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<{ id: string, data?: PopSnapElementDataState }>) => {
      const { id, data } = action.payload;
      state[id] = {
        isOpen: true,
        data: data || null,
      };
    },
    close: (state, action: PayloadAction<{ id: string, remove?:boolean }>) => {
      const { id, remove } = action.payload;
      if (state[id]) {
        state[id].isOpen = false;
        if(remove){
          delete state[id];
        }
      }
    },
    delete: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (state[id]) {
        delete state[id];
      }
    },
  }
})

export default popSnapSlice.reducer

export const popSnapActionsList = popSnapSlice.actions

export const selectIsPopSnapOpen = (state: RootState, id: string) => state.popSnap[id]?.isOpen;
export const selectPopSnapData = (state: RootState, id: string) => state.popSnap[id]?.data;