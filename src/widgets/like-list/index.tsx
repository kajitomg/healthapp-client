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

}

const LikeList =  memo((props:LikeListProps) => {
  const cartProps = useCart()
  const likeProps = useLike()
  
  const renders = {
    item:useCallback((item:IProduct) => (
      <LikeProductCard item={item} key={item?.id} likeProps={likeProps} cartProps={cartProps}/>
    ),[likeProps,cartProps])
  }

  if(props.list?.length){
    return (
      <Box display={'flex'} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'} sx={{containerType: "inline-size"}}>
        <List list={props.list} renderItem={renders.item}/>
      </Box>
    );
  }
  
  return <LikeNoProducts available={true}/>
  
});

export {LikeList};