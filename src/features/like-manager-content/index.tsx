import {Box, Typography} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {MainPrice} from "../main-price";
import {plural} from "../../shared/utils/plural.ts";
import {getTotalPrice} from "../../shared/utils/get-total-price.ts";

interface LikeManagerContentProps {
  
  products?:IProduct[]
}

const LikeManagerContent = (props:LikeManagerContentProps) => {
  
  
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} my={1}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
        <Typography fontSize={'medium'} fontWeight={'bold'}>
          {props.products?.length} {plural(props.products?.length,{one:'товар',few:'товара',many:'товаров'})}
        </Typography>
        <MainPrice price={getTotalPrice(props.products, false)}/>
      </Box>
    </Box>
  );
};

export {LikeManagerContent};