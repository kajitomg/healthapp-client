import Box from "@mui/material/Box";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {MainPrice} from "../main-price";
import {plural} from "../../shared/utils/plural.ts";
import {getTotalPrice} from "../../shared/utils/get-total-price.ts";
import {ManagerMainTypography} from "../../shared/components/manager-main-typography";

interface LikeManagerAmountContentProps {
  
  products?:IProduct[]
}

const LikeManagerAmountContent = (props:LikeManagerAmountContentProps) => {
  
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} my={1}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
        <ManagerMainTypography>
          {props.products?.length} {plural(props.products?.length,{one:'товар',few:'товара',many:'товаров'})}
        </ManagerMainTypography>
        <MainPrice price={getTotalPrice(props.products, false)}/>
      </Box>
    </Box>
  );
};

export {LikeManagerAmountContent};