import {useCallback} from 'react';
import {IProduct} from "../../entities/product/model/product-model.ts";
import {Box} from "@mui/material";
import {CartItemMedia} from "../cart-item-media";
import {CartItemContent} from "../cart-item-content";
import {CartItemActions} from "../cart-item-actions";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";

interface CartItemProps {
  
  item?:IProduct,
  
  onClick:(id:number) => void,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,
  
}

const CartItem = (props:CartItemProps) => {
  const callbacks = {
    
    onClick:useCallback(() => {
      props.item?.id && props.onClick && props.onClick(props.item?.id)
    },[]),
    
  }
  
  return (
    <Box display={'flex'} onClick={callbacks.onClick} width={'100%'} bgcolor={'white'} borderRadius={1} boxShadow={theme => theme.shadows[1]} mb={1} sx={{cursor:'pointer'}}>
      <CartItemMedia product={props.item}/>
      <Box width={'100%'} display={'flex'}>
        <CartItemContent
          product={props.item}
          cartProps={props.cartProps}
          sx={{
          flex:'1 1 auto'
        }}/>
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          flex:'0 1 100px',
          justifyContent:'space-between'
        }}>
          <CartItemActions
            product={props.item}
            cartProps={props.cartProps}
            likeProps={props.likeProps}
          />
        </Box>
      </Box>
    </Box>
  );
};

export {CartItem};