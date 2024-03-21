import {useCallback} from 'react';
import {Box} from "@mui/material";
import {List} from "../../shared/components/list";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {CartProductCard} from "../../features/cart-product-card";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";

interface CartListProps {
  
  list?:IProduct[],
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,
  
}

const CartList = (props:CartListProps) => {
  
  const renders = {
    item:useCallback((item:IProduct) => (
      <CartProductCard item={item} key={item?.id} likeProps={props.likeProps} cartProps={props.cartProps}/>
    ),[props.likeProps,props.cartProps])
  }
  
  return (
    <Box display={'flex'} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
      <List list={props.list} renderItem={renders.item}/>
    </Box>
  );
};

export {CartList};