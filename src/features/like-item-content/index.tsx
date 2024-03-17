import {Box, SxProps, Typography} from "@mui/material";
import {ProductPrice} from "../product-price";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";

interface LikeItemContentProps {

  product?:IProduct,
  
  sx?:SxProps,
  
  cartProps?:ReturnType<typeof useCart>
  
}

const LikeItemContent = (props:LikeItemContentProps) => {
  return (
    <Box sx={props.sx} p={1} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <Box>
        <Box display={'flex'} justifyContent={'space-between'} my={1}>
          <Typography fontSize={'x-large'} fontWeight={'bold'}>{props?.product?.name}</Typography>
          <ProductPrice price={props?.product?.price} discount={props?.product?.discount}/>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography fontWeight={'lighter'} fontSize={'small'}>В наличии: {props.product?.count} шт.</Typography>
      </Box>
    </Box>
  );
};

export {LikeItemContent};