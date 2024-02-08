import {default as paramsControllerReducers, paramsControllerActionsList} from './params-controller/reducer.ts';

const paramsControllerActions = {
  paramsController:paramsControllerActionsList
}

const paramsControllerState = {
  paramsController:paramsControllerReducers,
}

export {paramsControllerActions,paramsControllerState}