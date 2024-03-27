import {IProduct} from "../../entities/product/model/product-model.ts";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import styled from "@mui/material/styles/styled";
import {CartProductCardMedia} from "../cart-product-card-media";
import {CartProductCardContent} from "../cart-product-card-content";
import {CartProductCardActions} from "../cart-product-card-actions";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {ProductCard} from "../product-card";


const StyledCartProductCard = styled(ProductCard)(() => ({
  width:'100%',
  '@container (max-width: 508px)': {
    flexDirection:'column'
  },
}))

interface CartProductCardProps {
  
  item?:IProduct,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,
  
}

const CartProductCard = (props:CartProductCardProps) => {
  const {item,cartProps,likeProps} = props
  return (
    <StyledCartProductCard productId={item?.id} sx={{containerType: "inline-size"}}>
      <CartProductCardMedia images={item?.images}/>
      <CardContent sx={{
        flex:'1 1 100%'
      }}>
        <CartProductCardContent
          product={item}
          cartProps={cartProps}
        />
      </CardContent>
      <CardActions >
        <CartProductCardActions
          product={item}
          cartProps={cartProps}
          likeProps={likeProps}
        />
      </CardActions>
    </StyledCartProductCard>
  );
};


export {CartProductCard};