import {Box, SxProps} from "@mui/material";
import {ProductButtonLike} from "../product-button-like";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {ProductButtonBuy} from "../product-button-buy";

interface LikeItemActionsProps {
  
  product?:IProduct,
  
  sx?:SxProps,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,

}

const LikeItemActions = (props:LikeItemActionsProps) => {
  return (
    <Box sx={props.sx} display={'flex'} alignItems={'flex-center'} justifyContent={'space-between'} p={1} minWidth={'155px'}>
      <ProductButtonLike
        isAvailable={props.likeProps?.isLikeAvailable(props?.product)}
        onClick={() => props?.product && props.likeProps?.addProductToLike(props?.product)}
        onClickAvailable={() => props?.product && props.likeProps?.deleteProductFromLike(props?.product)}
      />
      <Box display={'flex'} flex={'1 1 100%'} justifyContent={'center'}>
        <ProductButtonBuy
          isAvailable={props.cartProps?.isCartAvailable(props?.product)}
          onClick={() => props?.product && props.cartProps?.addProductToCart(props?.product)}
          onClickAvailable={() => props?.product && props.cartProps?.deleteProductFromCart(props?.product)}
        />
      </Box>
    </Box>
  );
};

export {LikeItemActions};