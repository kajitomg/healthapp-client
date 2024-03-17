import {Box, Typography} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {MainPrice} from "../main-price";
import {plural} from "../../shared/utils/plural.ts";
import {getTotalPrice} from "../../shared/utils/get-total-price.ts";

interface CartManagerContentProps {

  products?:IProduct[]
}

const CartManagerContent = (props:CartManagerContentProps) => {

  
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} my={1}>
      <Box display={'flex'} flexDirection={'column'}>
        <Typography fontSize={'x-small'}>Итого:</Typography>
        <Typography fontSize={'medium'} fontWeight={'normal'}>{props.products?.length} {plural(props.products?.length,{one:'товар',few:'товара',many:'товаров'})}</Typography>
      </Box>
      <Box>
        <MainPrice price={getTotalPrice(props.products)}/>
      </Box>
    </Box>
  );
};

export {CartManagerContent};