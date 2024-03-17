import {Box} from "@mui/material";
import {CartList} from "../cart-list";
import {CartManager} from "../cart-manager";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";

interface CartProductsProps {
  
  products?:IProduct[],
  
  available?:boolean,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,
  
}

const CartProducts = (props:CartProductsProps) => {
  
  
  if(props.available) {
    return (
      <Box display={'flex'} alignItems={'flex-start'} minHeight={'600px'} position={'relative'} pt={2}>
        <Box flex={'1 1 auto'}>
          <CartList list={props.products} cartProps={props.cartProps} likeProps={props.likeProps}/>
        </Box>
        <CartManager products={props.products} cartProps={props.cartProps}/>
      </Box>
    );
  }
  return null
};

export {CartProducts};