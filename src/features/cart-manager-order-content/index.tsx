import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {MainPrice} from "../main-price";
import {plural} from "../../shared/utils/plural.ts";
import {getTotalPrice} from "../../shared/utils/get-total-price.ts";
import {ManagerSecondTypography} from "../../shared/components/manager-second-typography";
import {ManagerMainTypography} from "../../shared/components/manager-main-typography";

interface CartManagerOrderContentProps {

  products?:IProduct[]
}

const CartManagerOrderContent = (props:CartManagerOrderContentProps) => {

  
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} my={1}>
      <Box display={'flex'} flexDirection={'column'}>
        <ManagerSecondTypography>Итого:</ManagerSecondTypography>
        <ManagerMainTypography>{props.products?.length} {plural(props.products?.length,{one:'товар',few:'товара',many:'товаров'})}</ManagerMainTypography>
      </Box>
      <Box>
        <MainPrice price={getTotalPrice(props.products)}/>
      </Box>
    </Box>
  );
};

export {CartManagerOrderContent};