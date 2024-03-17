import {Card, CardActions, CardContent, styled} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductCardActions} from "../product-card-actions";
import {ProductCardContent} from "../product-card-content";
import {ProductCardMedia} from "../product-card-media";
import {useCallback} from "react";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";

interface ProductCardProps {
  
  item:IProduct,
  
  onClick?:(id:number) => void,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,
  
}

const StyledCard = styled(Card)(({theme}) => ({
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between',
  width: 'calc(33.333% - 16px)',
  cursor:'pointer',
  margin: 8,
  [theme.breakpoints.down('md')]:{
    width: 'calc(50% - 16px)'
  },
  [theme.breakpoints.down('sm')]:{
    width: 'calc(100% - 16px)'
  },
}))



const ProductCard = (props:ProductCardProps) => {
  const {item,cartProps,likeProps,onClick} = props
  const callbacks = {
    
    onClick:useCallback(() => {
      item?.id && onClick && onClick(item?.id)
    },[item?.id,onClick]),
    
  }
  
  return (
    <StyledCard onClick={() => callbacks.onClick()}>
        <ProductCardMedia images={item.images}/>
        <CardContent>
          <ProductCardContent name={item.name} description={item.description} article={item.article} count={item.count}/>
        </CardContent>
        <CardActions>
          <ProductCardActions discount={item.discount} price={item.price} product={item} cartProps={cartProps} likeProps={likeProps}/>
        </CardActions>
    </StyledCard>
  );
};

export {ProductCard};