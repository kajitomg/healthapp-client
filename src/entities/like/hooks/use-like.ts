import {useActions} from "../../../shared/services/redux/hooks/use-actions.ts";
import {useTypedSelector} from "../../../shared/services/redux/hooks/use-typed-selector.ts";
import {useLazyLoadProductsQuery} from "../../product/store/products/api.ts";
import {useCallback, useEffect, useState} from "react";
import {IProduct} from "../../product/model/product-model.ts";
import {
  useAddProductsToLikeMutation,
  useDeleteProductsFromLikeMutation,
  useLazyLoadLikeQuery
} from "../store/likes/api.ts";
import {addProductsToLike} from "../../../shared/utils/add-products-to-like.ts";
import {deleteProductsFromLike} from "../../../shared/utils/delete-products-from-like.ts";
import {baseEntitiesState} from "../../../shared/utils/reducer-handlers.ts";
import {ParamsType} from "../../../shared/models";
import {ILike} from "../model/like-model.ts";

export const useLike = () => {
  const localStorageName = 'likeItems'
  
  const {like:likeActions} = useActions()
  const like = useTypedSelector(state => state.like)
  
  const [addProducts] = useAddProductsToLikeMutation()
  const [deleteProducts] = useDeleteProductsFromLikeMutation()
  
  const [loadLike] = useLazyLoadLikeQuery()
  const [loadProducts,products] = useLazyLoadProductsQuery()
  
  const [memoProducts,setMemoProducts] = useState(products.currentData)

  const callbacks = {
    
    loadLike:useCallback(async (sessionId?:number):Promise<baseEntitiesState & {item:ILike} | undefined> => {
      if(sessionId){
        try {
          const like = await loadLike({
            id:sessionId,
            params:{
              'include[product]':''
            }
          })
          return like.data
        }catch (e){
          return
        }
      }
      return
    },[loadLike]),
    
    clearLikeState:useCallback(() => {
      likeActions.clearState()
      
      localStorage.setItem(localStorageName,JSON.stringify([]))
    },[likeActions]),
    
    isLikeAvailable:useCallback((product?:IProduct) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      const list:IProduct[] = storage
      return Boolean(list?.find((item) => item.id === product?.id))
    },[products.currentData]),
    
    loadLikeProducts:useCallback(async (params?:ParamsType) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      try {
        const products = await loadProducts({
          params:{
            data:JSON.stringify({id:storage.map((item:IProduct) => item.id)}),
            'include[image]':'',
            ...params
          }
        })
        return products.data
      }catch (e) {
        return
      }
    },[loadProducts]),
    
    syncLikeProducts:useCallback( async (likeId?:number) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      if(likeId){
        const products = storage
        
        if(products.length > 0)
          await addProducts({id:likeId, products})

        const productsData = await callbacks.loadLikeProducts({
          data:JSON.stringify({}),
          ...(likeId && {'include[like-product]':''}),
          ...(likeId && {'where[like-product][likeId]':likeId})
        })
        
        localStorage.setItem(localStorageName,JSON.stringify(productsData?.list))
      }
    },[addProducts, loadProducts]),
    
    addProductToLike:useCallback(  (product:IProduct) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      localStorage.setItem(localStorageName,JSON.stringify(addProductsToLike([product],storage)))
      
      if(like.item?.id){
        addProducts({id:like.item?.id,products:[product]})
      } else {
        likeActions.replaceState()
      }
      callbacks.loadLikeProducts()
    },[addProducts,likeActions,loadProducts,like]),
    
    deleteProductFromLike:useCallback( (product:IProduct) => {
      
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      localStorage.setItem(localStorageName,JSON.stringify(deleteProductsFromLike([product],storage)))
      if(like.item?.id){
        deleteProducts({id:like.item?.id,products:[product]})
      } else {
        likeActions.replaceState()
      }
      callbacks.loadLikeProducts()
    },[deleteProducts,likeActions,loadProducts,like]),
  }
  

  useEffect(() => {
    if(products.currentData && !products.isLoading){
      setMemoProducts(products.currentData)
    }
  },[products])
  
  
  return {like,likeProducts:memoProducts,likelocalStorageName:localStorageName,isLikeProductsLoading:products?.isLoading,...callbacks}
}