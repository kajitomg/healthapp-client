import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {memo, useCallback} from "react";
import {List} from "../../shared/components/list";
import {LikeProductCard} from "../../features/like-product-card";
import {LikeNoProducts} from "../../features/like-no-products";

interface LikeListProps {
  
  list?:IProduct[],
  
  likeProps?:ReturnType<typeof useLike>,

}

const LikeList =  memo((props:LikeListProps) => {
  const cartProps = useCart()
  
  const renders = {
    item:useCallback((item:IProduct) => (
      <LikeProductCard item={item} key={item?.id} likeProps={props.likeProps} cartProps={cartProps}/>
    ),[props.likeProps,cartProps])
  }
  
  if(props.list?.length !== 0){
    return (
      <Box display={'flex'} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
        <List list={props.list} renderItem={renders.item}/>
      </Box>
    );
  }
  return <LikeNoProducts available={true}/>
  
});

export {LikeList};