import {useCallback, useEffect, useState} from "react";
import {baseEntitiesState} from "../../../shared/utils/reducer-handlers.ts";
import {ParamsType} from "../../../shared/models";
import {useLazyLoadProductsPriceRangeQuery, useLazyLoadProductsQuery} from "../store/products/api.ts";
import {IProduct} from "../model/product-model.ts";

interface HookOptions {
  
  includeDefaultParams?:boolean
  
}

export const useProducts = () => {
  
  const [loadProducts,products] = useLazyLoadProductsQuery()
  const [loadRange,range] = useLazyLoadProductsPriceRangeQuery()
  
  const [memoProducts,setMemoProducts] = useState(products.currentData)
 
  const callbacks = {
    
    loadProducts:useCallback(async ({params,options}:{params?:ParamsType,options?:HookOptions}):Promise<baseEntitiesState & {list:IProduct[]} | undefined> => {
      try {
        return await loadProducts({
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
    },[loadProducts]),
    
    
    loadProductsPriceRange:useCallback(async ({params}:{params?:ParamsType}):Promise<baseEntitiesState & {item:{min:number,max:number}} | undefined> => {
      try {
        return await loadRange({
          params: {
            ...params
          }
        }).unwrap()
      } catch (e) {
        return
      }
    },[loadRange]),
    
  }
  
  useEffect(() => {
    if(products.currentData && !products.isLoading){
      setMemoProducts(products.currentData)
    }
  },[products])
  
  return {products:memoProducts,productsIsLoading:products.isLoading,productsPriceRange:range.currentData,...callbacks}
}