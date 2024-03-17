import {default as tabsControllerReducers, tabsControllerActionsList} from './tabs-controller/reducer.ts';

const tabsControllerActions = {
  tabsController:tabsControllerActionsList
}

const tabsControllerState = {
  tabsController:tabsControllerReducers,
}

export {tabsControllerActions,tabsControllerState}