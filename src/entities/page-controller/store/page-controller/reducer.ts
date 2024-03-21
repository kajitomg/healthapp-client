import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../../../shared/services/redux/model.ts";
import {RoutesType} from "../../models.ts";
import {NavigateOptions, To} from "react-router-dom";
import {nestedListInList} from "../../../../shared/utils/nested-list-in-list.ts";

interface PageControllerState {
  currentPage: RoutesType | null;
  list: RoutesType[];
  flatList: RoutesType[];
  navList: RoutesType[]
}

const initialState: PageControllerState = {
  currentPage: null,
  list: [],
  flatList: [],
  navList: []
}

export const pageControllerSlice = createSlice({
  name: 'pageController',
  initialState,
  reducers: {
    setPage: (state, action:PayloadAction<{id?:string,query?:string,redirect?:(path:To,options?:NavigateOptions) => void}>) => {
      
      const page = state.flatList.find((item) => item.id === action.payload.id)

      if(page){
        state.currentPage = page || null
        
        const path = typeof page.path === 'object' ? page.path[0] : page.path
        
        const queryPath = path.split(':').length > 1 ? path.split(':')[0] : null
        
        action.payload.redirect && action.payload.redirect(queryPath ? action.payload.query ? queryPath + action.payload.query : queryPath : path ,{state:{back:location.pathname}})
        
      }
      
    },
    setPages: (state, action:PayloadAction<{pages:RoutesType[]}>) => {
      state.list = action.payload.pages
      state.flatList = nestedListInList(action.payload.pages)
      state.navList = nestedListInList(action.payload.pages.filter((page) => page.nav))
      
    },
  },
})

export const pageControllerActionsList = pageControllerSlice.actions

export const selectCurrentPage = (state: RootState) => state.pageController.flatList.find((item) => item.id === state.pageController.currentPage?.id)

export const selectPageByPath = (state: RootState, path:string) => state.pageController.flatList.find((item) => item.path === path)

export const selectNavIndex = (state: RootState) => state.pageController.navList.findIndex((item) => item.id === state.pageController.currentPage?.id)

export default pageControllerSlice.reducer