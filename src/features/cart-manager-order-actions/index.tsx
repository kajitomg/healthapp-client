import {OrderButtonBuy} from "../order-button-buy";
import {lazy, memo, Suspense, useCallback, useState} from "react";
import {useActions} from "../../shared/services/redux/hooks/use-actions.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectIsPopSnapOpen} from "../../entities/pop-snap/store/pop-snap/reducer.ts";
import {getTotalPrice} from "../../shared/utils/get-total-price.ts";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCreateOrderMutation} from "../../entities/order/store/orders/api.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLazyLoadProductsQuery} from "../../entities/product/store/products/api.ts";
import {ButtonTypography} from "../../shared/components/button-typography";

const OrderCreateDialog = lazy(() => import("../order-create-dialog"))

interface CartManagerOrderActionsProps {

  products?:IProduct[],
  
  cartProps?:ReturnType<typeof useCart>,
}

const CartManagerOrderActions = memo((props:CartManagerOrderActionsProps) => {
  const [createOrderId] = useState('create-order-dialog')
  const {popSnap} = useActions()
  const isOpenCreateOrder = useTypedSelector(state => selectIsPopSnapOpen(state,createOrderId))
  const session = useTypedSelector(state => state.session)
  const [loadProducts] = useLazyLoadProductsQuery()
  const [createOrder] = useCreateOrderMutation()
  
  const callbacks = {
    
    onOpenCreateOrder:useCallback(() => {
      popSnap.open({
        id: createOrderId,
        data: {
          ...(props.products?.length && {count: props.products?.length}),
          total: getTotalPrice(props.products)
        }
      })
    },[popSnap,props.products]),
    
    onCloseCreateOrder:useCallback(() => {
      popSnap.close({id:createOrderId})
    },[popSnap]),
    
    onAcceptCreateOrder:useCallback(async (data:{ email?: string, phonenumber?: string, comment?: string}) => {
      if(session.user.id && props.products){
        const products = await loadProducts({
          params:{
            data:JSON.stringify({id:props.products?.map(item => item.id)}),
            ...(props.cartProps?.cart.item?.id && {'include[cart-product]':''}),
            ...(props.cartProps?.cart.item?.id && {'where[cart-product][cartId]':props.cartProps?.cart.item.id}),
          }
        }).unwrap()
        if(products?.list){
          const order = await createOrder({body:{...data,products:products.list,customerId:session.user.id}}).unwrap()
          if(order?.item){
            await props.cartProps?.deleteProductFromCart(products.list)
            await callbacks.onCloseCreateOrder()
          }
        }
      }else {
        console.log('Не авторизован')
      }
    },[props.products,session.user.id,createOrder,props?.cartProps?.deleteProductFromCart,props?.cartProps?.cart])
    
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