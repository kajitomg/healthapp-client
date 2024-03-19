import {Box, Typography} from "@mui/material";
import {ProductCounter} from "../product-counter";
import {ProductPrice} from "../product-price";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {ProductCardName} from "../product-card-name";

interface CartProductCardContentProps {
  
  product?:IProduct,
  
  cartProps?:ReturnType<typeof useCart>
  
}

const CartProductCardContent = (props:CartProductCardContentProps) => {
  return (
    <Box sx={{
      height:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between'
    }}>
      <Box>
        <Box display={'flex'} justifyContent={'space-between'} my={1}>
          <ProductCardName name={props?.product?.name}/>
          <ProductPrice price={props?.product?.price} discount={props?.product?.discount}/>
        </Box>
        <Box display={'flex'}>
          <ProductCounter product={props?.product} cartProps={props.cartProps}/>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography fontWeight={'lighter'} fontSize={'small'}>В наличии: {props.product?.count} шт.</Typography>
      </Box>
    </Box>
  );
};

export {CartProductCardContent};