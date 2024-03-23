import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import styled from "@mui/material/styles/styled";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {LikeProductCardMedia} from "../like-product-card-media";
import {LikeProductCardActions} from "../like-product-card-actions";
import {LikeProductCardContent} from "../like-product-card-content";
import {ProductCard} from "../product-card";

const StyledLikeProductCard = styled(ProductCard)(() => ({
  width:'100%'
}))

interface LikeProductCardProps {
  
  item?:IProduct,
  
  likeProps?:ReturnType<typeof useLike>,
  
  cartProps?:ReturnType<typeof useCart>,
}

const LikeProductCard = (props:LikeProductCardProps) => {
  const {item,cartProps,likeProps} = props
  
 
  return (
    <StyledLikeProductCard productId={props.item?.id}>
      <LikeProductCardMedia images={item?.images}/>
      <CardContent sx={{
        flex:'1 1 100%'
      }}>
        <LikeProductCardContent
          product={item}/>
      </CardContent>
      <CardActions sx={{
        flex:'0 1 100px',
      }}>
        <LikeProductCardActions
          product={item}
          cartProps={cartProps}
          likeProps={likeProps}
        />
      </CardActions>
    </StyledLikeProductCard>
  );
};

export {LikeProductCard};