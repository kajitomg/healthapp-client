import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../../shared/services/redux/model.ts";
import cleaningParams from "../../../../shared/utils/cleaning-params.ts";
import {ParamsType} from "../../../../shared/models";
import {RoutesType} from "../../../page-controller/models.ts";
import merge from 'lodash.merge'
import {deleteObjectElementsHasInObject} from "../../../../shared/utils/delete-object-elements-has-in-object.ts";
import {updateHistory} from "../../../../shared/utils/update-history.ts";
import {createURL} from "../../../../shared/utils/create-url.ts";

interface ParamControllerElementState {
    list:ParamsType
}

interface ParamsControllerState {
  [id:string]:ParamControllerElementState,
}

const initialState:ParamsControllerState = {}

const paramsControllerSlice = createSlice({
  name:'paramsController',
  initialState,
  reducers:{
    set: (state, action: PayloadAction<{page?:RoutesType | null,newParams?:ParamsType,replace?:boolean}>) => {
      const { page, newParams, replace } = action.payload;
      if(page){
        const params = cleaningParams(merge({...page?.params},state[page?.id]?.list,newParams))

        state[page?.id] = {
          list:params
        };
        
        updateHistory(createURL(params),replace)
      }
    },
    delete: (state, action: PayloadAction<{page?:RoutesType | null,params?:ParamsType,replace?:boolean}>) => {
      const { page, params, replace } = action.payload;
      if(page && params){
        const objectWithDeletedElements = deleteObjectElementsHasInObject(state[page?.id]?.list,params)

        state[page?.id] = {
          list:objectWithDeletedElements
        }
        
        updateHistory(createURL(objectWithDeletedElements),replace)
        
      }
    }

  }
})

export default paramsControllerSlice.reducer

export const paramsControllerActionsList = paramsControllerSlice.actions

export const selectParams = (state: RootState, id: string) => state.paramsController[id]?.list
export const selectParamsElement = (state: RootState, id?: string | null) => id ? state.paramsController[id]?.list : null