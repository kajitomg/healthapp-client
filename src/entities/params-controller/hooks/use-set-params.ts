import {useCallback} from "react";
import {createParamsWithLocation} from "../../../shared/utils/create-params-with-location.ts";
import {ParamsType} from "../models.ts";
import {useActions} from "../../../shared/services/redux/hooks/use-actions.ts";
import {RoutesType} from "../../page-controller/models.ts";
import {useTypedSelector} from "../../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectParamsElement} from "../store/params-controller/reducer.ts";

interface UseStateParamsProps {
  page?:RoutesType | null
}

export const useSetParams = (props:UseStateParamsProps) => {
  const params = useTypedSelector(state => selectParamsElement(state,props?.page?.id))
  const {paramsController} = useActions()
  
  const callbacks = {
    setParams:useCallback(async (params:ParamsType) => {
      await paramsController.set({page:props.page,newParams:createParamsWithLocation(params)})
    },[props.page])
  }
  
  return {params,...callbacks}
}