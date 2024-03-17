import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {LikeItemMedia} from "../like-item-media";
import {LikeItemActions} from "../like-item-actions";
import {LikeItemContent} from "../like-item-content";
import {useCallback} from "react";

interface LikeItemProps {
  
  item:IProduct,
  
  onClick:(id:number) => void,
  
  likeProps:ReturnType<typeof useLike>,
  
  cartProps:ReturnType<typeof useCart>,
}

const LikeItem = (props:LikeItemProps) => {
  
  const callbacks = {
    
    onClick:useCallback(() => {
      props.item?.id && props.onClick && props.onClick(props.item?.id)
    },[]),
    
  }
  return (
    <Box display={'flex'} onClick={callbacks.onClick} width={'100%'} bgcolor={'white'} borderRadius={1} boxShadow={theme => theme.shadows[1]} my={1} sx={{cursor:'pointer'}}>
      <LikeItemMedia product={props.item}/>
      <Box width={'100%'} display={'flex'}>
        <LikeItemContent
          product={props.item}
          sx={{
            flex:'1 1 auto'
          }}/>
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          flex:'0 1 100px',
          justifyContent:'space-between'
        }}>
          <LikeItemActions
            product={props.item}
            cartProps={props.cartProps}
            likeProps={props.likeProps}
          />
        </Box>
      </Box>
    </Box>
  );
};

export {LikeItem};