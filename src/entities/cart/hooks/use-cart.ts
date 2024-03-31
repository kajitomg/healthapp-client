import {useCallback, useEffect, useState} from "react";
import {IProduct} from "../../product/model/product-model.ts";
import {incrementProductInCart} from "../../../shared/utils/increment-product-in-cart.ts";
import {decrementProductInCart} from "../../../shared/utils/decrement-product-in-cart.ts";
import {deleteProductsFromCart} from "../../../shared/utils/delete-products-from-cart.ts";
import {useActions} from "../../../shared/services/redux/hooks/use-actions.ts";
import {useTypedSelector} from "../../../shared/services/redux/hooks/use-typed-selector.ts";
import {
  useAddProductsToCartMutation,
  useDecrementProductInCartMutation,
  useDeleteProductsFromCartMutation,
  useIncrementProductInCartMutation, useLazyLoadCartQuery
} from "../store/carts/api.ts";
import {useLazyLoadProductsQuery} from "../../product/store/products/api.ts";
import {addProductsToCart} from "../../../shared/utils/add-products-to-cart.ts";
import {ParamsType} from "../../../shared/models";
import {baseEntitiesState} from "../../../shared/utils/reducer-handlers.ts";
import {ICart} from "../model/cart-model.ts";
import useLocalStorage from "use-local-storage";

export const useCart = () => {
  const [localStorageName] = useState('cartItems')
  const [storage,setStorage] = useLocalStorage<IProduct[]>(localStorageName,JSON.parse(localStorage.getItem(localStorageName) || JSON.stringify([])))

  const {cart:cartActions} = useActions()
  const cart = useTypedSelector(state => state.cart)
  
  const [addProducts] = useAddProductsToCartMutation()
  const [deleteProducts] = useDeleteProductsFromCartMutation()
  const [incrementProduct] = useIncrementProductInCartMutation()
  const [decrementProduct] = useDecrementProductInCartMutation()
  
  const [loadCart] = useLazyLoadCartQuery()
  const [loadProducts,products] = useLazyLoadProductsQuery()
  
  const [memoProducts,setMemoProducts] = useState(products.currentData)

  const callbacks = {
    
    loadCart:useCallback(async (sessionId:number):Promise<baseEntitiesState & {item:ICart} | undefined> => {
      if(sessionId){
        try {
          const cart = await loadCart({
            id:sessionId,
            params:{
              'include[product]':''
            }
          })
          return cart.data
        }catch (e){
          return
        }
      }
      return
    },[loadCart]),
    
    clearCartState:useCallback(() => {
      cartActions.clearState()
      setStorage([])
    },[cartActions]),
    
    isCartAvailable:useCallback((product?:IProduct) => {
      const list:IProduct[] = storage
      return Boolean(list?.find((item) => item.id === product?.id))
    },[products.currentData, storage]),
    
    loadCartProducts:useCallback(async (params?:ParamsType, products?:IProduct[]):Promise<baseEntitiesState & {list:IProduct[]} | undefined> => {
      const dataProducts = products || storage
      try {
        const products = await loadProducts({
          params:{
            data:JSON.stringify({id:dataProducts.map((item:IProduct) => item.id)}),
            'include[image]':'',
            ...params
          }
        })
        return products.data
      }catch (e) {
        return
      }
    },[loadProducts, storage]),
    
    syncCartProducts:useCallback( async (cartId?:number) => {
      if(cartId){
        const products = storage
        
        if(products.length > 0)
          await addProducts({id:cartId, products})
        
        const productsData = await callbacks.loadCartProducts({
          data:JSON.stringify({}),
          sort:JSON.stringify(['createdAt','ASC']),
          ...(cartId && {'include[cart-product]':''}),
          ...(cartId && {'where[cart-product][cartId]':cartId}),
        })
        console.log(productsData?.list)
        await setStorage(productsData?.list)
      }
    },[addProducts, loadProducts, storage]),
    
    addProductToCart:useCallback(async (product:IProduct | IProduct[]) => {
      const products = addProductsToCart(Array.isArray( product) ? product : [product],storage)
      setStorage(products)
      if(cart.item?.id){
        await addProducts({id:cart.item?.id,products:Array.isArray( product) ? product : [product]})
      } else {
        await cartActions.replaceState()
      }
      await callbacks.loadCartProducts({},products)
    },[addProducts,cartActions,loadProducts,cart,storage]),
    
    deleteProductFromCart:useCallback( async (product:IProduct | IProduct[]) => {
      const products = deleteProductsFromCart(Array.isArray( product) ? product : [product],storage)
      setStorage(products)
      if(cart.item?.id){
        await deleteProducts({id:cart.item?.id,products:Array.isArray( product) ? product : [product]})
      } else {
        await cartActions.replaceState()
      }
      
      await callbacks.loadCartProducts({},products)
    },[deleteProducts,cartActions,loadProducts,cart,storage]),
    
    incrementProductInCart:useCallback( (product?:IProduct) => {
      if(product){
        const products = incrementProductInCart(product,storage)
        setStorage(products)
        if(cart.item?.id){
          incrementProduct({id:cart.item?.id,product})
        } else {
          cartActions.replaceState()
        }
        callbacks.loadCartProducts({},products)
      }
    },[incrementProduct,cartActions,loadProducts,cart,storage]),
    
    decrementProductInCart:useCallback( (product?:IProduct) => {
      if(product){
        const products = decrementProductInCart(product,storage)
        setStorage(products)
        if(cart.item?.id){
          decrementProduct({id:cart.item?.id,product})
        } else {
          cartActions.replaceState()
        }
        callbacks.loadCartProducts({},products)
      }
    },[decrementProduct,cartActions,loadProducts,cart,storage]),
  }
  
  useEffect(() => {
    if(products.currentData && !products.isLoading){
      setMemoProducts(products.currentData)
    }
  },[products])
  
  
  return {cart,cartProducts:memoProducts,localStorageName,isCartProductsLoading:products.isLoading,storage,...callbacks}
}