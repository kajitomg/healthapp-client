import {useCallback, useEffect, useState} from "react";
import {baseEntitiesState} from "../../../shared/utils/reducer-handlers.ts";
import {ParamsType} from "../../../shared/models";
import {useLazyLoadProductQuery} from "../store/products/api.ts";
import {IProduct} from "../model/product-model.ts";

interface HookOptions {
  
  includeDefaultParams?:boolean
  
}

export const useProduct = () => {
  
  const [loadProduct,product] = useLazyLoadProductQuery()
  
  const [memoProduct,setMemoProduct] = useState(product.currentData)
  
  const callbacks = {
    
    loadProduct:useCallback(async ({data,params,options}:{data:{id?:string},params?:ParamsType,options?:HookOptions}):Promise<baseEntitiesState & {item:IProduct} | undefined> => {
      if(data.id){
        try {
          return await loadProduct({
            id:data.id,
            params: {
              ...(options?.includeDefaultParams && {
                'include[category]': '',
                'include[image]': '',
                'include[document]': '',
                'include[specification]': '',
              }),
              ...params
            }
          }).unwrap()
        } catch (e) {
          return
        }
      }
      return
    },[loadProduct]),
    
  }
  
  useEffect(() => {
    if(product.currentData && !product.isLoading){
      setMemoProduct(product.currentData)
    }
  },[product])
  
  return {product:memoProduct,productsIsLoading:product.isLoading,...callbacks}
}