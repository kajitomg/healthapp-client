import {useOrder} from "../../entities/order/hooks/use-order.ts";
import {useCallback, useEffect} from "react";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {List} from "../../shared/components/list";
import {OrderCard} from "../../features/order-card";
import {IOrder} from "../../entities/order/model/order-model.ts";
import {LikeNoItems} from "../../features/order-no-items";

const OrderList = () => {
  const session = useTypedSelector(state => state.session)
  const {orders,loadOrders,ordersIsLoading} = useOrder()
  
  useEffect(() => {
    if(session.exists){
      loadOrders(session.user.id)
    }
  },[session,loadOrders])
  
  const renders = {
    item:useCallback((order:IOrder) => (
      <OrderCard key={order.id} order={order}/>
    ),[])
  }
  
  if(orders?.list && orders?.list.length > 0){
    return (
      <List list={orders?.list} renderItem={renders.item}/>
    );
  }
  return <LikeNoItems available={!ordersIsLoading}/>
};

export {OrderList};