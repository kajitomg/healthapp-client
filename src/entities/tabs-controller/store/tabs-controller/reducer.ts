import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ReactNode} from "react";
import {RootState} from "../../../../shared/services/redux/model.ts";

export interface TabsControllerElementState {
  id:string,
  label:string,
  component:ReactNode
  page?:string,
}

interface TabsControllerState {
  [name: string]: {
    list:TabsControllerElementState[],
    available:number
  }
}

const initialState:TabsControllerState = {}


const tabsControllerSlice = createSlice({
  name:'tabsController',
  initialState,
  reducers:{
    set:(state, action: PayloadAction<{name:string, tabs:TabsControllerElementState[], availableId?:string}>) => {
      const {tabs, name, availableId } = action.payload;
      
      const available = availableId ? tabs.findIndex(tab => tab.id === availableId) === -1 ? 0 : tabs.findIndex(tab => tab.id === availableId) : 0
      state[name] = {
        list:tabs,
        available
      }
    },
    
    setAvailable:(state, action: PayloadAction<{name:string, tabs:TabsControllerElementState[],index:number}>) => {
      const {name, tabs, index} = action.payload;
      
      if(state[name]){
        state[name] = {
          list:tabs,
          available:index
        }
        
      }
    },
    
  }
})

export default tabsControllerSlice.reducer

export const tabsControllerActionsList = tabsControllerSlice.actions

export const selectTabsElement = (state: RootState, name?: string | null) => name ? state.tabsController[name] : null
