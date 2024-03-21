import {useCallback, useEffect, useState} from "react";
import {baseEntitiesState} from "../../../shared/utils/reducer-handlers.ts";
import {ParamsType} from "../../../shared/models";
import {ISpecification} from "../model/specification-model.ts";
import {useLazyLoadSpecificationsQuery} from "../store/specifications/api.ts";

interface HookOptions {
  
  includeDefaultParams?:boolean
  
}

export const useSpecifications = () => {
  
  const [loadSpecifications,specifications] = useLazyLoadSpecificationsQuery()
  
  const [memoSpecifications,setMemoSpecifications] = useState(specifications.currentData)
 
  const callbacks = {
    
    loadSpecifications:useCallback(async ({data,params,options}:{data:{id:number[]},params?:ParamsType,options?:HookOptions}):Promise<baseEntitiesState & {list:ISpecification[]} | undefined> => {
      try {
        return await loadSpecifications({
          params: {
            ...(data.id && {data:JSON.stringify({id:data.id})}),
            ...(options?.includeDefaultParams && {
              'include[type]': '',
            }),
            ...params
          }
        }).unwrap()
      } catch (e) {
        return
      }
    },[loadSpecifications]),
    
  }
  
  useEffect(() => {
    if(specifications.currentData && !specifications.isLoading){
      setMemoSpecifications(specifications.currentData)
    }
  },[specifications])
  
  return {specifications:memoSpecifications,productsIsLoading:specifications.isLoading,...callbacks}
}