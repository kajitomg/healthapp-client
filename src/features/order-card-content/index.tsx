import Box from "@mui/material/Box";
import {SxProps} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IOrder} from "../../entities/order/model/order-model.ts";
import {List} from "../../shared/components/list";
import {useCallback} from "react";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {OrderProductCard} from "../order-product-card";
import {OrderCardContentInfo} from "../order-card-content-info";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

interface OrderCardContentProps {
  
  order?:IOrder,
  
  sx?:SxProps,
  
}

const OrderCardContent = (props:OrderCardContentProps) => {
  const theme = useTheme()
  const isMediaQueryMd = useMediaQuery(theme.breakpoints.up('md'))
  
  const renders = {
    
    item:useCallback((product:IProduct) => (
      <OrderProductCard key={product.id} item={product}/>
    ),[])
    
  }
  
  return (
    <Box sx={{containerType: "inline-size"}}>
      <Typography fontSize={'medium'} fontWeight={'bold'}>Заказ: {props.order?.id}</Typography>
      <OrderCardContentInfo order={props.order}/>
      <Typography fontWeight={'bold'}>Товары:</Typography>
      <Box display={'flex'} justifyContent={'flex-start'} overflow={'auto'} maxWidth={isMediaQueryMd ? '195px' : '390px'}>
        <List list={props.order?.products} renderItem={renders.item}/>
      </Box>
    </Box>
  );
};

export {OrderCardContent};