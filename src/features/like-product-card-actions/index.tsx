import {Box, SxProps} from "@mui/material";
import {ProductButtonLike} from "../product-button-like";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {ProductButtonBuy} from "../product-button-buy";

interface LikeProductCardActionsProps {
  
  product?:IProduct,
  
  sx?:SxProps,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,

}

const LikeProductCardActions = (props:LikeProductCardActionsProps) => {
  return (
    <Box sx={{
      height:'100%',
      display:'flex',
      alignItems:'flex-start',
      justifyContent:'space-between',
      minWidth:'140px'
    }}>
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

export {LikeProductCardActions};