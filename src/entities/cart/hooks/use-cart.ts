import {useCallback, useState} from "react";
import {IProduct} from "../../product/model/product-model.ts";
import {incrementProductInCart} from "../../../shared/utils/increment-product-in-cart.ts";
import {decrementProductInCart} from "../../../shared/utils/decrement-product-in-cart.ts";
import {deleteProductsFromCart} from "../../../shared/utils/delete-products-from-cart.ts";
import {useActions} from "../../../shared/services/redux/hooks/use-actions.ts";
import {
  useAddProductsToCartMutation,
  useDecrementProductInCartMutation,
  useDeleteProductsFromCartMutation,
  useIncrementProductInCartMutation, useLazyLoadCartQuery
} from "../store/carts/api.ts";
import {addProductsToCart} from "../../../shared/utils/add-products-to-cart.ts";
import {ParamsType} from "../../../shared/models";
import {baseEntitiesState} from "../../../shared/utils/reducer-handlers.ts";
import {ICart} from "../model/cart-model.ts";
import {useLazyLoadProductsQuery} from "../../product/store/products/api.ts";
import {useTypedSelector} from "../../../shared/services/redux/hooks/use-typed-selector.ts";

export const useCart = () => {
  const [localStorageName] = useState('cartItems')

  const {cart:cartActions} = useActions()
  const cart = useTypedSelector(state => state.cart)
  
  const [addProducts] = useAddProductsToCartMutation()
  const [deleteProducts] = useDeleteProductsFromCartMutation()
  const [incrementProduct] = useIncrementProductInCartMutation()
  const [decrementProduct] = useDecrementProductInCartMutation()
  
  const [loadCart] = useLazyLoadCartQuery()
  const [loadProducts,products] = useLazyLoadProductsQuery()

  const callbacks = {
    
    loadCart:useCallback(async (sessionId?:number):Promise<baseEntitiesState & {item:ICart} | undefined> => {
      if(sessionId){
        try {
          return await loadCart({
            id:sessionId,
            params:{
              'include[product]':''
            }
          }).unwrap()
        }catch (e){
          return
        }
      }
      return
    },[loadCart]),
    
    clearCartState:useCallback(() => {
      cartActions.clearState()
      localStorage.setItem(localStorageName,JSON.stringify([]))
    },[cartActions]),
    
    isCartAvailable:useCallback((product?:IProduct) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      const list:IProduct[] = storage
      return Boolean(list?.find((item) => item.id === product?.id))
    },[products.currentData]),
    
    loadCartProducts:useCallback(async (params?:ParamsType, products?:IProduct[]):Promise<baseEntitiesState & {list:IProduct[]} | undefined> => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      const dataProducts = products || storage
      try {
        cartActions.replaceProductsState({error:null,waiting:true})
        
        const products = await loadProducts({
          params:{
            data:JSON.stringify({id:dataProducts.map((item:IProduct) => item.id)}),
            'include[image]':'',
            ...params
          }
        }).unwrap()
        
        cartActions.replaceProductsState({error:null,waiting:false,products:products.list,count:products.count})
        return products
      }catch (e) {
        console.log(e)
        cartActions.replaceProductsState({error:null,waiting:false})
        return
      }
    },[loadProducts]),
    
    syncCartProducts:useCallback( async (cartId?:number) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      cartActions.replaceProductsState({error:null,waiting:true,products:storage})
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
        localStorage.setItem(localStorageName,JSON.stringify(productsData?.list))
      }
      cartActions.replaceProductsState({waiting:false})
    },[addProducts, loadProducts]),
    
    addProductToCart:useCallback(async (product:IProduct | IProduct[]) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      const products = addProductsToCart(Array.isArray( product) ? product : [product],storage)
      
      cartActions.replaceProductsState({products,waiting:false})

      localStorage.setItem(localStorageName,JSON.stringify(products))
      
      if(cart.item?.id){
        await addProducts({id:cart.item.id,products:Array.isArray( product) ? product : [product]})
      }
    },[addProducts,cartActions,loadProducts,cart.item?.id]),
    
    deleteProductFromCart:useCallback( async (product:IProduct | IProduct[]) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      const products = deleteProductsFromCart(Array.isArray( product) ? product : [product],storage)
      
      cartActions.replaceProductsState({products,waiting:false})
      
      localStorage.setItem(localStorageName,JSON.stringify(products))
      
      if(cart.item?.id){
        await deleteProducts({id:cart.item?.id,products:Array.isArray( product) ? product : [product]})
      }
    },[deleteProducts,cartActions,loadProducts,cart.item?.id]),
    
    incrementProductInCart:useCallback( async (product?:IProduct) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      if(product){
        const products = incrementProductInCart(product,storage)
        
        cartActions.replaceProductsState({products,waiting:false})
        
        localStorage.setItem(localStorageName,JSON.stringify(products))
        
        if(cart.item?.id){
          await incrementProduct({id:cart.item?.id,product})
        }
        
        await callbacks.loadCartProducts({},products)
      }
    },[incrementProduct,cartActions,loadProducts,cart.item?.id]),
    
    decrementProductInCart:useCallback( async (product?:IProduct) => {
      const storage = JSON.parse(localStorage.getItem(localStorageName) || '[]')
      
      if(product){
        const products = decrementProductInCart(product,storage)
        
        cartActions.replaceProductsState({products,waiting:false})
        
        localStorage.setItem(localStorageName,JSON.stringify(products))
        
        if(cart.item?.id){
          await decrementProduct({id:cart.item?.id,product})
        }
        await callbacks.loadCartProducts({},products)
      }
    },[decrementProduct,cartActions,loadProducts,cart.item?.id]),
  }
  
  
  return {cartLocalStorageName:localStorageName,...callbacks}
}