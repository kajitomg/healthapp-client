import {Box, Typography} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductPrice} from "../product-price";
import {ProductButtonBuy} from "../product-button-buy";

interface ProductDataProps {

  data?:IProduct
  
}

const ProductData = (props:ProductDataProps) => {
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} height={'100%'}>
      <Box my={2} paddingX={2} bgcolor={'white'} borderRadius={1} boxShadow={theme => theme.shadows[1]} mb={1} p={1} minHeight={'60%'}>
        <Typography fontSize={'x-large'} fontWeight={'bolder'}>{props?.data?.name}</Typography>
      </Box>
      <Box my={2} p={1} display={'flex'} flexDirection={'column'} borderRadius={1} boxShadow={theme => theme.shadows[1]}bgcolor={'white'}>
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
      </Box>
    </Box>
  );
};

export {ProductData};