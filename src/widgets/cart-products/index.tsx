import {Box} from "@mui/material";
import {CartList} from "../cart-list";
import {CartManagerOrder} from "../cart-manager-order";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {memo} from "react";
import {Loader} from "../../shared/components/loader";
import {CartNoProducts} from "../../features/cart-no-products";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

interface CartProductsProps {
  
  products?:IProduct[],
  
  available?:boolean,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,
  
}

const CartProducts = memo((props:CartProductsProps) => {
  const theme = useTheme()
  const isMediaQueryMd = useMediaQuery(theme.breakpoints.down('md'))
  
  if(props.available && props.cartProps?.cartProducts?.list.length && !props.cartProps?.isCartProductsLoading) {
    return (
      <Box display={'flex'} flexDirection={isMediaQueryMd ? 'column-reverse' : 'row'} alignItems={'flex-start'} minHeight={'600px'} position={'relative'} pt={2}>
        <Box flex={'1 1 auto'}>
          <CartList list={props.products} cartProps={props.cartProps} likeProps={props.likeProps}/>
        </Box>
        <CartManagerOrder products={props.products} cartProps={props.cartProps}/>
      </Box>
    );
  }
  if(props.available && props.cartProps?.cartProducts?.list.length === 0 && !props.cartProps?.isCartProductsLoading){
    return (
      <CartNoProducts available={true}/>
    )
  }
  return <Loader/>
});

export {CartProducts};