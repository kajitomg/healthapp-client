import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductPrice} from "../product-price";
import {ProductButtonBuy} from "../product-button-buy";
import {ManagerLayout} from "../../shared/components/manager-layout";

interface ProductDataProps {

  data?:IProduct
  
}

const ProductData = (props:ProductDataProps) => {
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} height={'100%'}>
      <ManagerLayout >
        <Typography fontSize={'x-large'} fontWeight={'bolder'}>{props?.data?.name}</Typography>
      </ManagerLayout>
      <ManagerLayout>
        <Box display={'flex'} alignItems={'center'}>
          <Box flex={'1 1 100%'} paddingX={2} display={'flex'}>
            <ProductPrice price={props?.data?.price} discount={props?.data?.discount}/>
          </Box>
          <ProductButtonBuy/>
        </Box>
        <Box>
          <Typography fontSize={'smaller'} fontWeight={'lighter'}>Артикул: {props?.data?.article}</Typography>
          <Typography fontSize={'smaller'} fontWeight={'lighter'}>Осталось: {props?.data?.count }шт.</Typography>
        </Box>
      </ManagerLayout>
    </Box>
  );
};

export {ProductData};