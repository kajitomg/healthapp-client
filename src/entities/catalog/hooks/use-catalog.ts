import {useActions} from "../../../shared/services/redux/hooks/use-actions.ts";
import {useCallback} from "react";
import {ParamsType} from "../../../shared/models";
import {useProducts} from "../../product/hooks/use-products.ts";
import {useCategory} from "../../product/hooks/use-category.ts";

export const useCatalog = () => {
  
  const {catalog:catalogActions} = useActions()
  const {loadProducts,loadProductsPriceRange} = useProducts()
  const {loadCategory} = useCategory()
  
  const callbacks = {
    
    loadCatalogCategory:useCallback(async ({query}:{query?:{categoryId?:string | number}}) => {

      if(query?.categoryId){
        try {
          catalogActions.replaceCategoryState({error:null,waiting:true})
          
            const category = await loadCategory({
              query:{
                id:query?.categoryId
              },
              params: {
                'include[category]': 'childrens',
              },
              options:{
                includeDefaultParams:true
              }
            })
          
          catalogActions.replaceCategoryState({error:null,waiting:false,category:category?.item})
          
          return category
        }catch (e) {
          catalogActions.replaceCategoryState({error:null,waiting:false})
          return
        }
      }
    },[loadCategory]),
    
    loadCatalogProducts:useCallback(async ({query,params,options}:{query?:{categoryId?:string | number,paginationPageId?:number},params?:ParamsType | null,options?:{isLoadWithCategory?:boolean,limit?:number}}) => {
      
      try {
        
        catalogActions.replaceProductsState({error:null,waiting:true})
        
        const products = await loadProducts({
          params: {
            ...(params?.filter && {filter: JSON.stringify(params?.filter)}),
            ...(options?.isLoadWithCategory && query?.categoryId && {'where[category][id]': query?.categoryId}),
            ...(params?.sort && {sort: JSON.stringify(params?.sort)}),
            ...(params?.search && {search: JSON.stringify(params?.search)}),
            ...(query?.paginationPageId && {page: query?.paginationPageId}),
            limit: options?.limit || 10
          },
          options:{
            includeDefaultParams:true
          }
        })
        
        catalogActions.replaceProductsState({error:null,waiting:false,products:products?.list,count:products?.count})
        return products
      }catch (e) {
        catalogActions.replaceProductsState({error:null,waiting:false})
        return
      }
    },[loadProducts]),
    
    
    
    loadCatalogProductsRange:useCallback(async ({query,params,options}:{query?:{categoryId?:string | number},params?:ParamsType | null,options?:{isLoadWithCategory?:boolean}}) => {
      
      try {
        
        const range = await loadProductsPriceRange({
          params: {
            ...(params?.filter && {filter: JSON.stringify(params?.filter)}),
            ...(params?.search && {search: JSON.stringify(params?.search)}),
            ...(options?.isLoadWithCategory && {'include[category]': ''}),
            ...(options?.isLoadWithCategory && query?.categoryId && {'where[category][id]': query?.categoryId}),
          },
        })
        
        catalogActions.replaceProductsState({pricesRange:range?.item})
        return range
      }catch (e) {
        return
      }
    },[loadProductsPriceRange]),
  }
  
  
  return {...callbacks}
}