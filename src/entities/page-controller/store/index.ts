import {default as pageControllerReducers, pageControllerActionsList} from './page-controller/reducer.ts';


const pageControllerState = {
  pageController:pageControllerReducers,
}

const pageControllerActions = {
  pageController:pageControllerActionsList,
}

export {pageControllerState,pageControllerActions}