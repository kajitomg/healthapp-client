import {useCallback, useEffect, useState} from "react";
import {baseEntitiesState} from "../../../shared/utils/reducer-handlers.ts";
import {ParamsType} from "../../../shared/models";
import {IOrder} from "../model/order-model.ts";
import {useLazyLoadOrdersQuery} from "../store/orders/api.ts";
import {useLazyLoadProductsQuery} from "../../product/store/products/api.ts";
import {IProduct} from "../../product/model/product-model.ts";

export const useOrder = () => {
  
  const [loadOrders,orders] = useLazyLoadOrdersQuery()
  const [loadProducts,products] = useLazyLoadProductsQuery()
  
  const [memoProducts,setMemoProducts] = useState(products.currentData)
  const [memoOrders,setMemoOrders] = useState(orders.currentData)
  
  const callbacks = {
    
    loadOrders:useCallback(async (sessionId:number,params?:ParamsType):Promise<baseEntitiesState & {list:IOrder[]} | undefined> => {
      if(sessionId) {
        try {
          const orders = await loadOrders({
            params: {
              'include[status]': '',
              'include[product]':'',
              'where[customer][id]': sessionId,
              ...params
            }
          })
          return orders.data
        } catch (e) {
          return
        }
      }
      return
    },[loadOrders]),
    
    loadOrderProducts:useCallback(async (order:IOrder,params?:ParamsType):Promise<baseEntitiesState & {list:IProduct[]} | undefined> => {
      try {
        const products = await loadProducts({
          params:{
            data:JSON.stringify({id:order.products?.map((item) => item.id)}),
            'include[image]':'',
            ...params
          }
        })
        return products.data
      }catch (e) {
        return
      }
    },[loadProducts]),
  }
  
  useEffect(() => {
    if(orders.currentData && !orders.isLoading){
      setMemoOrders(orders.currentData)
    }
  },[orders])
  
  
  useEffect(() => {
    if(products.currentData && !products.isLoading){
      setMemoProducts(products.currentData)
    }
  },[products])
  
  return {orders:memoOrders,orderProducts:memoProducts,...callbacks}
}