import {useCallback, useEffect, useState} from "react";
import {baseEntitiesState} from "../../../shared/utils/reducer-handlers.ts";
import {ParamsType} from "../../../shared/models";
import {useLazyLoadCategoryQuery} from "../store/categories/api.ts";
import {ICategory} from "../model/category-model.ts";

interface HookOptions {
  
  includeDefaultParams?:boolean
  
}

export const useCategory = () => {
  
  const [loadCategory,category] = useLazyLoadCategoryQuery()
  
  const [memoCategory,setMemoCategory] = useState(category.currentData)
  
  const callbacks = {
    
    loadCategory:useCallback(async ({data,params,options}:{data:{id:number},params?:ParamsType,options?:HookOptions}):Promise<baseEntitiesState & {item:ICategory} | undefined> => {
      try {
        return await loadCategory({
          id:data.id,
          params: {
            ...(options?.includeDefaultParams && {
              'include[level]':'',
            }),
            ...params
          }
        }).unwrap()
      } catch (e) {
        return
      }
    },[loadCategory]),
  }
  
  useEffect(() => {
    if(category.currentData && !category.isLoading){
      setMemoCategory(category.currentData)
    }
  },[category])
  
  return {category:memoCategory,categoryIsLoading:category.isLoading,...callbacks}
}