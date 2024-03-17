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
import useLocalStorage from "use-local-storage";

export const useLike = () => {
  const localStorageName = 'likeItems'
  const [storage,setStorage] = useLocalStorage<IProduct[]>(localStorageName,JSON.parse(localStorage.getItem(localStorageName) || JSON.stringify([])))
  
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
      setStorage([])
    },[likeActions]),
    
    isLikeAvailable:useCallback((product?:IProduct) => {
      const list:IProduct[] = storage
      return Boolean(list?.find((item) => item.id === product?.id))
    },[products.currentData, storage]),
    
    loadLikeProducts:useCallback(async (params?:ParamsType) => {
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
    },[loadProducts, storage]),
    
    syncLikeProducts:useCallback( async (likeId?:number) => {
      if(likeId){
        const products = storage
        
        if(products.length > 0)
          await addProducts({id:likeId, products})

        const productsData = await callbacks.loadLikeProducts({
          data:JSON.stringify({}),
          ...(likeId && {'include[like-product]':''}),
          ...(likeId && {'where[like-product][likeId]':likeId})
        })
        
        await setStorage(productsData?.list)
      }
    },[addProducts, loadProducts, storage, setStorage]),
    
    addProductToLike:useCallback(  (product:IProduct) => {
      setStorage(addProductsToLike([product],storage))
      if(like.item?.id){
        addProducts({id:like.item?.id,products:[product]})
      } else {
        likeActions.replaceState()
      }
      callbacks.loadLikeProducts()
    },[addProducts,likeActions,loadProducts,like,storage,setStorage]),
    
    deleteProductFromLike:useCallback( (product:IProduct) => {
      setStorage(deleteProductsFromLike([product],storage));
      if(like.item?.id){
        deleteProducts({id:like.item?.id,products:[product]})
      } else {
        likeActions.replaceState()
      }
      callbacks.loadLikeProducts()
    },[deleteProducts,likeActions,loadProducts,like,storage,setStorage]),
  }
  

  useEffect(() => {
    if(products.currentData && !products.isLoading){
      setMemoProducts(products.currentData)
    }
  },[products])
  
  
  return {like,likeProducts:memoProducts,storage,isLikeProductsLoading:products?.isLoading,...callbacks}
}