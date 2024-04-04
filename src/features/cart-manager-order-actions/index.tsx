import {OrderButtonBuy} from "../order-button-buy";
import {lazy, memo, Suspense, useCallback, useState} from "react";
import {useActions} from "../../shared/services/redux/hooks/use-actions.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectIsPopSnapOpen} from "../../entities/pop-snap/store/pop-snap/reducer.ts";
import {getTotalPrice} from "../../shared/utils/get-total-price.ts";
import {useCreateOrderMutation} from "../../entities/order/store/orders/api.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLazyLoadProductsQuery} from "../../entities/product/store/products/api.ts";
import {ButtonTypography} from "../../shared/components/button-typography";
import {FormFieldDataType} from "../../shared/components/form-field";

const OrderCreateDialog = lazy(() => import("../order-create-dialog"))


const CartManagerOrderActions = memo(() => {
  const [createOrderId] = useState('create-order-dialog')
  const {popSnap} = useActions()
  const isOpenCreateOrder = useTypedSelector(state => selectIsPopSnapOpen(state,createOrderId))
  const session = useTypedSelector(state => state.session)
  const cart = useTypedSelector(state => state.cart)
  
  const [loadProducts] = useLazyLoadProductsQuery()
  const [createOrder] = useCreateOrderMutation()
  const {deleteProductFromCart} = useCart()
  
  
  const callbacks = {
    
    onOpenCreateOrder:useCallback(() => {
      popSnap.open({
        id: createOrderId,
        data: {
          ...(cart.products.list?.length && {count: cart.products.list?.length}),
          total: getTotalPrice(cart.products.list)
        }
      })
    },[popSnap,cart.products.list]),
    
    onCloseCreateOrder:useCallback(() => {
      popSnap.close({id:createOrderId})
    },[popSnap]),
    
    onAcceptCreateOrder:useCallback(async (data:{ email?: FormFieldDataType, phonenumber?: FormFieldDataType, comment?: FormFieldDataType}) => {
      if(session.user.id && cart.products.list){
        const products = await loadProducts({
          params:{
            data:JSON.stringify({id:cart.products.list?.map(item => item.id)}),
            ...(cart.item?.id && {'include[cart-product]':''}),
            ...(cart.item?.id && {'where[cart-product][cartId]':cart.item?.id}),
          }
        }).unwrap()
        if(products?.list){
          const reformedData:Record<string, string | number> = {}
          for (const [key, value] of Object.entries(data)) {
            reformedData[key] = value.value
          }
          const order = await createOrder({body:{...reformedData,products:products.list,customerId:session.user.id}}).unwrap()
          if(order?.item){
            await deleteProductFromCart(products.list)
            await callbacks.onCloseCreateOrder()
          }
        }
      }else {
        console.log('Не авторизован')
      }
    },[cart.products.list,session.user.id,createOrder,deleteProductFromCart,cart.item])
    
  }
  if(session.exists){
    return (
      <>
        <OrderButtonBuy fullWidth onClick={callbacks.onOpenCreateOrder}>
          <ButtonTypography>
            Перейти к оформлению
          </ButtonTypography>
        </OrderButtonBuy>
        <Suspense fallback={null}>
          <OrderCreateDialog onClose={callbacks.onCloseCreateOrder} onSubmit={callbacks.onAcceptCreateOrder} isOpen={isOpenCreateOrder} popSnapName={createOrderId}/>
        </Suspense>
      </>
    );
  }
  return null
});

export {CartManagerOrderActions};