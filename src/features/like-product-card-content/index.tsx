import Box from "@mui/material/Box";
import {SxProps} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ProductPrice} from "../product-price";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {ProductCardName} from "../product-card-name";

interface LikeProductCardContentProps {

  product?:IProduct,
  
  sx?:SxProps,
  
  cartProps?:ReturnType<typeof useCart>
  
}

const LikeProductCardContent = (props:LikeProductCardContentProps) => {
  return (
    <Box sx={{
      height:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between'
    }}>
      <Box>
        <Box display={'flex'} justifyContent={'space-between'} my={1}>
          <ProductCardName name={props.product?.name}/>
          <ProductPrice price={props?.product?.price} discount={props?.product?.discount}/>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography fontWeight={'lighter'} fontSize={'small'}>В наличии: {props.product?.count} шт.</Typography>
      </Box>
    </Box>
  );
};

export {LikeProductCardContent};