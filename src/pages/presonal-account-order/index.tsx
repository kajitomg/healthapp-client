import {OrderList} from "../../widgets/order-list";
import {useOrder} from "../../entities/order/hooks/use-order.ts";
import {useEffect} from "react";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {Loader} from "../../shared/components/loader";

const PersonalAccountOrder = () => {
  const session = useTypedSelector(state => state.session)
  const orderProps = useOrder()
  
  useEffect(() => {
    if(session.exists){
      orderProps?.loadOrders(session.user.id)
    }
  },[session,orderProps?.loadOrders])

  if(!orderProps.ordersIsLoading && !session.waiting && orderProps.orders?.list !== undefined) {
    return (
      <OrderList list={orderProps.orders?.list} orderProps={orderProps}/>
    );
  }
  return <Loader/>
};

export {PersonalAccountOrder};