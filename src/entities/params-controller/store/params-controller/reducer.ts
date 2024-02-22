import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../../shared/services/redux/model.ts";
import cleaningParams from "../../../../shared/utils/cleaning-params.ts";
import {ParamsType} from "../../models.ts";
import {RoutesType} from "../../../page-controller/models.ts";
import {getLocationPathname} from "../../../../shared/utils/get-location-pathname.ts";
import {getLocationHash} from "../../../../shared/utils/get-location-hash.ts";
import {replaceHistory} from "../../../../shared/utils/replace-history.ts";
import {pushHistory} from "../../../../shared/utils/push-history.ts";


interface ParamControllerElementState {
    list:ParamsType
}

interface ParamsControllerState {
  [id:string]:ParamControllerElementState,
  
}

const updateHistory = (url:string,replace?:boolean) => {
  if (replace) {
    replaceHistory({}, '', url);
  } else {
    pushHistory({}, '', url);
  }
}

const createURLSearch = (params:ParamsType) => {
  return new URLSearchParams(params).toString();
}

const createURL = (params:ParamsType) => {
  const urlSearch = createURLSearch(params)
  
  return getLocationPathname() + (urlSearch ? `?${urlSearch}`: '') + getLocationHash()
}

const initialState:ParamsControllerState = {}

const paramsControllerSlice = createSlice({
  name:'paramsController',
  initialState,
  reducers:{
    set: (state, action: PayloadAction<{page?:RoutesType | null,newParams?:ParamsType,replace?:boolean}>) => {
      const { page, newParams, replace } = action.payload;
      if(page){
        const params = cleaningParams({...page?.params,...state[page?.id]?.list,...newParams})

        state[page?.id] = {
          list:params
        };
        
        updateHistory(createURL(params),replace)
      }
    },

  }
})

export default paramsControllerSlice.reducer

export const paramsControllerActionsList = paramsControllerSlice.actions

export const selectParams = (state: RootState, id: string) => state.paramsController[id]?.list
export const selectParamsElement = (state: RootState, id?: string | null) => id ? state.paramsController[id]?.list : null