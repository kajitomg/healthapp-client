import {Box} from "@mui/material";
import {ProductPrice} from "../product-price";
import {ProductCardButton} from "../product-card-button";

interface ProductCardActionsProps {
  
  price?:number,
  
  discount?:number
  
}

const ProductCardActions = (props:ProductCardActionsProps) => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} minHeight={'46px'} paddingX={1}>
      <ProductCardButton/>
      <ProductPrice price={props.price} discount={props.discount}/>
    </Box>
  );
};

export {ProductCardActions};