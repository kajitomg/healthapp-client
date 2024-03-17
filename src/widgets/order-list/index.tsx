import {useOrder} from "../../entities/order/hooks/use-order.ts";
import {useCallback, useEffect} from "react";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {List} from "../../shared/components/list";
import {OrderItem} from "../../features/order-item";
import {IOrder} from "../../entities/order/model/order-model.ts";
import {LikeNoItems} from "../../features/order-no-items";

const OrderList = () => {
  const session = useTypedSelector(state => state.session)
  const {orders,loadOrders} = useOrder()
  
  useEffect(() => {
    if(session.exists){
      loadOrders(session.user.id)
    }
  },[session,loadOrders])
  
  const renders = {
    item:useCallback((order:IOrder) => (
      <OrderItem key={order.id} order={order}/>
    ),[])
  }
  
  if(orders?.list && orders?.list.length > 0){
    return (
      <List list={orders?.list} renderItem={renders.item}/>
    );
  }
  return <LikeNoItems available={true}/>
};

export {OrderList};