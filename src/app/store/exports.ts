import {combineReducers} from "redux";
import {userState} from "../../entities/user/store";
import {api} from "../../shared/services/api";
import {sessionInterceptors} from "../../entities/user/store/session/interceptors.ts";
import {pageControllerActions, pageControllerState} from "../../entities/page-controller/store";
import {popSnapActions, popSnapState} from "../../entities/pop-snap/store";
import {paramsControllerActions, paramsControllerState} from "../../entities/params-controller/store";
import {productState} from "../../entities/product/store";

const rootState = combineReducers({
  ...userState,
  ...popSnapState,
  ...pageControllerState,
  ...paramsControllerState,
  ...productState,
  [api.reducerPath]: api.reducer,
})
const rootActions = {
  ...popSnapActions,
  ...pageControllerActions,
  ...paramsControllerActions
}
const rootInterceptor = {
  ...sessionInterceptors,
}

export {rootState,rootActions,rootInterceptor}