import {combineReducers} from "redux";
import {userState} from "../../entities/user/store";
import {api} from "../../shared/services/api";
import {sessionInterceptors} from "../../entities/user/store/session/interceptors.ts";
import {pageControllerActions, pageControllerState} from "../../entities/page-controller/store";
import {popSnapActions, popSnapState} from "../../entities/pop-snap/store";
import {paramsControllerActions, paramsControllerState} from "../../entities/params-controller/store";
import {productState} from "../../entities/product/store";
import {cartActions,cartState} from "../../entities/cart/store";
import {likeActions,likeState} from "../../entities/like/store";
import {tabsControllerActions,tabsControllerState} from "../../entities/tabs-controller/store";
import {catalogState} from "../../entities/catalog/store";
import {searchState} from "../../entities/search/store";
import {catalogActions} from "../../entities/catalog/store";
import {orderActions, orderState} from "../../entities/order/store";

const rootState = combineReducers({
  ...userState,
  ...popSnapState,
  ...pageControllerState,
  ...paramsControllerState,
  ...productState,
  ...cartState,
  ...likeState,
  ...tabsControllerState,
  ...catalogState,
  ...searchState,
  ...orderState,
  [api.reducerPath]: api.reducer,
})
const rootActions = {
  ...popSnapActions,
  ...pageControllerActions,
  ...paramsControllerActions,
  ...cartActions,
  ...likeActions,
  ...tabsControllerActions,
  ...catalogActions,
  ...orderActions,
}
const rootInterceptor = {
  ...sessionInterceptors,
}

export {rootState,rootActions,rootInterceptor}