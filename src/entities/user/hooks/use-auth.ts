import {useCallback} from "react";
import {useTypedSelector} from "../../../shared/services/redux/hooks/use-typed-selector.ts";
import {
  useLazyRefreshQuery,
  useSigninMutation,
  useSignoutMutation,
  useSignupMutation
} from "../store/session/api.ts";
import {useCart} from "../../cart/hooks/use-cart.ts";
import {useLike} from "../../like/hooks/use-like.ts";
import {ApiOptions} from "../../../shared/services/api/model.ts";
import {useRedirect} from "../../page-controller/hooks/use-redirect.ts";

export const useAuth = () => {
  const session = useTypedSelector(state => state.session)
  
  const [signup] = useSignupMutation()
  const [signin] = useSigninMutation()
  const [signout] = useSignoutMutation()
  const [refresh] = useLazyRefreshQuery()
  
  const {back} = useRedirect()
  const {syncCartProducts,loadCart,clearCartState} = useCart()
  const {syncLikeProducts,loadLike,clearLikeState} = useLike()

  const callbacks = {
    
    signin:useCallback(async (data: {email?: string, password?: string}, options?: ApiOptions) => {
      const signinData = await signin(
        {
          data,
          options:{
            onSuccess:() => {
              back()
            },
            ...options
          }
        }).unwrap()
      if(signinData.item){
        await callbacks.syncCartData(signinData.item.id)
        await callbacks.syncLikeData(signinData.item.id)
      }
    },[signin,back,loadCart,syncCartProducts,loadLike,syncLikeProducts]),
    
    signout:useCallback(async () => {
      await signout().unwrap()
      clearCartState()
      clearLikeState()
    },[signout]),
    
    refresh:useCallback(async (options?: ApiOptions) => {
      const refreshData = await refresh(
        {
          options
        }).unwrap()
      
      if(refreshData.item){
        await callbacks.syncCartData(refreshData.item.id)
        await callbacks.syncLikeData(refreshData.item.id)
      }
    },[refresh,loadCart,syncCartProducts,loadLike,syncLikeProducts]),
    
    signup:useCallback(async (data: {email?: string, password?: string, name?: string}, options?: ApiOptions) => {
      const signupData = await signup(
        {
          data,
          options:{
            onSuccess:() => {
              back()
            },
            ...options
          }
        }).unwrap()
      if(signupData.item){
        await callbacks.syncCartData(signupData.item.id)
        await callbacks.syncLikeData(signupData.item.id)
      }
    },[signup,loadCart,syncCartProducts,loadLike,syncLikeProducts]),
    
    syncCartData:useCallback(async (sessionId:number) => {
      const data = await loadCart(sessionId)
      if(data?.item.id){
        await syncCartProducts(data.item.id)
      }
    },[loadCart,syncCartProducts]),
    
    syncLikeData:useCallback(async (sessionId:number) => {
      const data = await loadLike(sessionId)
      if(data?.item.id){
        await syncLikeProducts(data.item.id)
      }
    },[loadLike,syncLikeProducts]),
  }
  
  return {session, ...callbacks}
}