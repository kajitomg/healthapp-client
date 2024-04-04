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
import {useOrder} from "../../order/hooks/use-order.ts";

export const useAuth = () => {
  const session = useTypedSelector(state => state.session)
  
  const [signup] = useSignupMutation()
  const [signin] = useSigninMutation()
  const [signout] = useSignoutMutation()
  const [refresh] = useLazyRefreshQuery()
  
  const {back} = useRedirect()
  const {syncCartProducts,loadCart,clearCartState} = useCart()
  const {syncLikeProducts,loadLike,clearLikeState} = useLike()
  const {clearOrderState} = useOrder()

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
      if(signinData.item) {
        callbacks.syncCartData(signinData.item.id)
        callbacks.syncLikeData(signinData.item.id)
      }
    },[signin,back,loadCart,syncCartProducts,loadLike,syncLikeProducts]),
    
    signout:useCallback(async () => {
      await signout().unwrap()
      clearCartState()
      clearLikeState()
      clearOrderState()
    },[signout]),
    
    refresh:useCallback(async (options?: ApiOptions) => {
      const refreshData = await refresh({
          options
      })
      
      callbacks.syncCartData(refreshData.data?.item.id)
      callbacks.syncLikeData(refreshData.data?.item.id)
      
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
        callbacks.syncCartData(signupData.item.id)
        callbacks.syncLikeData(signupData.item.id)
      }
    },[signup,loadCart,syncCartProducts,loadLike,syncLikeProducts]),
    
    syncCartData:useCallback(async (sessionId?:number) => {
      const data = await loadCart(sessionId)
      
      syncCartProducts(data?.item.id)
      
    },[loadCart,syncCartProducts]),
    
    syncLikeData:useCallback(async (sessionId?:number) => {
      const data = await loadLike(sessionId)
      
      syncLikeProducts(data?.item.id)
    },[loadLike,syncLikeProducts]),
  }
  
  return {session, ...callbacks}
}