import {Box, SxProps} from "@mui/material";
import {ProductButtonLike} from "../product-button-like";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {ProductButtonDelete} from "../product-button-delete";

interface CartItemActionsProps {
  
  product?:IProduct,
  
  sx?:SxProps,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,
  
}

const CartItemActions = (props:CartItemActionsProps) => {
  
  return (
    <Box sx={props.sx} display={'flex'} alignItems={'center'} justifyContent={'flex-end'} p={1}>
      <ProductButtonLike
        isAvailable={props.likeProps?.isLikeAvailable(props?.product)}
        onClick={() => props?.product && props.likeProps?.addProductToLike(props?.product)}
        onClickAvailable={() => props?.product && props.likeProps?.deleteProductFromLike(props?.product)}
      />
      <ProductButtonDelete onClick={() => props?.product && props.cartProps?.deleteProductFromCart(props?.product)}/>
    </Box>
  );
};

export {CartItemActions};