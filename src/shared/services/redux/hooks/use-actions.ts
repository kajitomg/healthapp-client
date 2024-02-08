import {bindActionCreators} from "redux";
import {rootActions} from "../../../../app/store/exports.ts";
import {useTypedDispatch} from "./use.typed-dispatch.ts";


type ActionCreators = typeof rootActions;

type ActionTypes = {
  [K in keyof ActionCreators]: {
    [SubK in keyof ActionCreators[K]]: ActionCreators[K][SubK]
  }
}

const useActions = () => {
  const dispatch = useTypedDispatch()
  const actions:ActionTypes = {} as ActionTypes
  let item:keyof ActionCreators
  for (item in rootActions){
    actions[item] = bindActionCreators(rootActions[item],dispatch)
  }
  return actions
}
export {useActions}