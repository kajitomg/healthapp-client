import {useActions} from "../../../shared/services/redux/hooks/use-actions.ts";
import {useTypedSelector} from "../../../shared/services/redux/hooks/use-typed-selector.ts";
import {useLazyLoadProductsQuery} from "../../product/store/products/api.ts";
import {useCallback} from "react";
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
        likeActions.replaceProductsState({error:null,waiting:true})
        
        const products = await loadProducts({
          params:{
            data:JSON.stringify({id:storage.map((item:IProduct) => item.id)}),
            'include[image]':'',
            ...params
          }
        }).unwrap()
        
        likeActions.replaceProductsState({error:null,waiting:false,products:products.list,count:products.count})
        return products
      }catch (e) {
        likeActions.replaceProductsState({error:null,waiting:false})
        return
      }
    },[loadProducts]),
    
    syncLikeProducts:useCallback( async (likeId?:number) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      likeActions.replaceProductsState({error:null,waiting:true,products:storage})
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
      likeActions.replaceProductsState({waiting:false})
    },[addProducts, loadProducts]),
    
    addProductToLike:useCallback(  (product:IProduct) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      const products = addProductsToLike([product],storage)
      
      likeActions.replaceProductsState({products,waiting:false})
      
      localStorage.setItem(localStorageName,JSON.stringify(products))
      
      if(like.item?.id){
        addProducts({id:like.item?.id,products:[product]})
      }
      
      callbacks.loadLikeProducts()
    },[addProducts,likeActions,loadProducts,like]),
    
    deleteProductFromLike:useCallback( (product:IProduct) => {
      
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      const products = deleteProductsFromLike([product],storage)
      
      likeActions.replaceProductsState({products,waiting:false})
      
      localStorage.setItem(localStorageName,JSON.stringify(products))
      if(like.item?.id){
        deleteProducts({id:like.item?.id,products:[product]})
      }
      
      callbacks.loadLikeProducts()
    },[deleteProducts,likeActions,loadProducts,like]),
  }
  
  
  return {likeLocalStorageName:localStorageName,...callbacks}
}