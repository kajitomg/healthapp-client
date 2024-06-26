import {useOrder} from "../../entities/order/hooks/use-order.ts";
import {useCallback} from "react";
import {List} from "../../shared/components/list";
import {OrderCard} from "../../features/order-card";
import {IOrder} from "../../entities/order/model/order-model.ts";
import {LikeNoItems} from "../../features/order-no-items";
import {StyledList} from "../../shared/components/styled-list";


interface OrderListProps {
  
  list?:IOrder[],
  
  orderProps?:ReturnType<typeof useOrder>,
  
}

const OrderList = (props:OrderListProps) => {
  
  const renders = {
    item:useCallback((order:IOrder) => (
      <OrderCard key={order.id} order={order}/>
    ),[])
  }
  
  if(props.list && props.list?.length > 0){
    return (
      <StyledList minItemWidth={'270px'} m={1}>
        <List list={props?.list} renderItem={renders.item}/>
      </StyledList>
    );
  }
  return <LikeNoItems available={true}/>
};

export {OrderList};