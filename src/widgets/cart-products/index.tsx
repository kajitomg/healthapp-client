import {Box} from "@mui/material";
import {CartList} from "../cart-list";
import {CartManagerOrder} from "../cart-manager-order";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {memo} from "react";
import {Loader} from "../../shared/components/loader";
import {CartNoProducts} from "../../features/cart-no-products";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";


const CartProducts = memo(() => {
  const theme = useTheme()
  const isMediaQueryMd = useMediaQuery(theme.breakpoints.down('md'))
  
  const cart = useTypedSelector(state => state.cart)
  
  const cartProps = useCart()
  
  if(cart.products.list?.length && !cart.products?.waiting && !cart.waiting) {
    return (
      <Box display={'flex'} flexDirection={isMediaQueryMd ? 'column-reverse' : 'row'} justifyContent={'flex-end'} alignItems={'flex-start'} minHeight={'600px'} position={'relative'}>
        <Box width={'100%'}>
          <CartList list={cart.products.list} cartProps={cartProps}/>
        </Box>
        <CartManagerOrder products={cart.products.list} cartProps={cartProps}/>
      </Box>
    );
  }
  if(!cart.products?.list?.length && !cart.products?.waiting && !cart.waiting){
    return (
      <CartNoProducts available={true}/>
    )
  }
  return <Loader/>
});

export {CartProducts};