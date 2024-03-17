import {Box, Divider, Typography} from "@mui/material";
import {getOrderTotalPrice} from "../../shared/utils/get-order-total-price.ts";
import {IOrder} from "../../entities/order/model/order-model.ts";
import {SecondPrice} from "../second-price";
import {List} from "../../shared/components/list";
import {useCallback} from "react";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {OrderProductCard} from "../order-product-card";
import {OrderItemContent} from "../order-item-content";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";

interface OrderItemProps {
  
  order?:IOrder
  
}

const OrderItem = (props:OrderItemProps) => {
  const {setPage,pages,page} = useSetPage()
  const {setParams} = useParams()
  
  const callbacks = {
    
    onProductClick:useCallback((id:number) => {
      setPage('product',id.toString())
      setParams({},pages?.list?.find(page => page.id === 'product'))
    },[setParams,page]),
    
  }
  
  
  const renders = {
    
    item:useCallback((product:IProduct) => (
      <OrderProductCard key={product.id} product={product} onClick={callbacks.onProductClick}/>
    ),[callbacks.onProductClick])
    
  }
  return (
    <Box display={'flex'} width={'100%'} bgcolor={'white'} borderRadius={1} boxShadow={theme => theme.shadows[1]} my={1} p={1}>
      <Box width={'100%'} display={'flex'}>
        <Box width={'100%'}>
          <Typography fontSize={'medium'} fontWeight={'bold'}>Заказ: {props.order?.id}</Typography>
          <OrderItemContent order={props.order}/>
          <Box>
            <Typography fontWeight={'bold'}>Товары:</Typography>
            <Box display={'flex'} justifyContent={'flex-start'} overflow={'auto'} maxWidth={'390px'}>
              <List list={props.order?.products} renderItem={renders.item}/>
            </Box>
          </Box>
        </Box>
        <Divider orientation={'vertical'}/>
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          flex:'0 1 200px',
          justifyContent:'space-between',
          p:1
        }}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
            <Typography fontSize={'x-small'} fontWeight={'bold'}>Статус:</Typography>
            <Typography fontSize={'small'} fontWeight={'bold'}> {props.order?.status?.value}</Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
            <Typography fontSize={'x-small'} fontWeight={'bold'} mr={'2px'}>Предварительная сумма:</Typography>
            <SecondPrice size={'small'} price={getOrderTotalPrice(props.order?.products)}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export {OrderItem};