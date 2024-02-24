import {useCallback} from "react";
import {ParamsType} from "../../../shared/models";
import {useActions} from "../../../shared/services/redux/hooks/use-actions.ts";
import {RoutesType} from "../../page-controller/models.ts";
import {useTypedSelector} from "../../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectParamsElement} from "../store/params-controller/reducer.ts";

interface UseSetParamsProps {
  page?:RoutesType | null
}

export const useParams = (props?:UseSetParamsProps) => {
  const params = useTypedSelector(state => selectParamsElement(state,props?.page?.id))
  const {paramsController} = useActions()
  
  
  const callbacks = {
    
    setParams:useCallback((params:ParamsType, page?:RoutesType, replace?:boolean) => {
      paramsController.set({page:page || props?.page,newParams:params,replace})
    },[paramsController, props?.page]),
    
    deleteParams:useCallback((params:ParamsType, page?:RoutesType, replace?:boolean) => {
      paramsController.delete({page:page || props?.page,params:params,replace})
    },[paramsController, props?.page])
    
  }
  
  return {params, ...callbacks}
}