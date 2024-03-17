import {Box, Typography} from "@mui/material";
import {MainPrice} from "../main-price";
import {SecondPrice} from "../second-price";

interface ProductPriceProps {
  
  price?:number,
  
  discount?:number
  
}

const ProductPrice = (props:ProductPriceProps) => {
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      {props.price && <MainPrice price={props.price} isDiscount={Boolean(props.discount)}/>}
      {props.discount && <SecondPrice price={props.discount} isDiscount={Boolean(props.price)}/>}
      {!props.price && !props.discount && <SecondPrice price={'Цена не указана'}/>}
    </Box>
  );
};

export {ProductPrice};