import {memo, useCallback} from 'react';
import {List} from "../../shared/components/list";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {CartProductCard} from "../../features/cart-product-card";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {StyledList} from "../../shared/components/styled-list";

interface CartListProps {
  
  list?:IProduct[],
  
  cartProps?:ReturnType<typeof useCart>,
  
}

const CartList = memo((props:CartListProps) => {
  const likeProps = useLike()
  
  const renders = {
    item:useCallback((item:IProduct) => (
      <CartProductCard item={item} key={item?.id} likeProps={likeProps} cartProps={props.cartProps}/>
    ),[likeProps,props.cartProps])
  }
  
  return (
    <StyledList minItemWidth={'270px'} m={1}>
      <List list={props.list} renderItem={renders.item}/>
    </StyledList>
  );
});

export {CartList};