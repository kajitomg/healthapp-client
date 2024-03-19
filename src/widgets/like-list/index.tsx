import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useCallback} from "react";
import {List} from "../../shared/components/list";
import {LikeProductCard} from "../../features/like-product-card";
import {LikeNoProducts} from "../../features/like-no-products";

interface LikeListProps {
  
  list?:IProduct[],
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,

}

const LikeList = (props:LikeListProps) => {
  const renders = {
    item:useCallback((item:IProduct) => (
      <LikeProductCard item={item} key={item?.id} likeProps={props.likeProps} cartProps={props.cartProps}/>
    ),[props.likeProps,props.cartProps])
  }
  
  if(props.list?.length !== 0){
    return (
      <Box className={'Like_list'} display={'flex'} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
        <List list={props.list} renderItem={renders.item}/>
      </Box>
    );
  }
  return <LikeNoProducts available={true}/>
  
};

export {LikeList};