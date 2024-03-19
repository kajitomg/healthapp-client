import {Box} from "@mui/material";
import {ProductButtonLike} from "../product-button-like";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {ProductButtonDelete} from "../product-button-delete";

interface CartProductCardActionsProps {
  
  product?:IProduct,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,
  
}

const CartProductCardActions = (props:CartProductCardActionsProps) => {
  
  return (
    <Box sx={{
      height:'100%',
      display:'flex',
      alignItems:'flex-start',
    }}>
      <ProductButtonLike
        isAvailable={props.likeProps?.isLikeAvailable(props?.product)}
        onClick={() => props?.product && props.likeProps?.addProductToLike(props?.product)}
        onClickAvailable={() => props?.product && props.likeProps?.deleteProductFromLike(props?.product)}
      />
      <ProductButtonDelete onClick={() => props?.product && props.cartProps?.deleteProductFromCart(props?.product)}/>
    </Box>
  );
};

export {CartProductCardActions};