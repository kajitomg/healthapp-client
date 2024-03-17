import {IProduct} from "../../entities/product/model/product-model.ts";
import {Box} from "@mui/material";
import {OrderProductCardMedia} from "../order-product-card-media";
import {OrderProductCardContent} from "../order-product-card-content";
import {useCallback} from "react";

interface OrderProductCardProps {
  
  product?:IProduct,
  
  onClick?:(id:number) => void
}

const OrderProductCard = (props:OrderProductCardProps) => {
  
  const callbacks = {
    
    onClick:useCallback(() => {
      props.product?.id && props.onClick && props.onClick(props.product?.id)
    },[props.product?.id,props.onClick]),
    
  }
  
  return (
    <Box display={'flex'} flexDirection={'column'} onClick={callbacks.onClick} bgcolor={'white'} borderRadius={1} boxShadow={theme => theme.shadows[1]} m={1}
      sx={{
        cursor:'pointer'
      }}
    >
      <OrderProductCardMedia product={props.product}/>
      <Box width={'100%'} display={'flex'}>
        <OrderProductCardContent
          product={props.product}
          sx={{
            flex:'1 1 auto'
          }}/>
       
      </Box>
    </Box>
  );
};

export {OrderProductCard};