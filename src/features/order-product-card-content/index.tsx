import {Box, SxProps, Typography} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";

interface OrderProductCardContentProps {
  
  product?:IProduct,
  
  sx?:SxProps,
  
}

const OrderProductCardContent = (props:OrderProductCardContentProps) => {
  return (
    <Box sx={props.sx} p={1} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <Box display={'flex'} justifyContent={'space-between'} my={1}>
        <Typography fontSize={'small'} fontWeight={'bold'}>{props?.product?.name}</Typography>
      </Box>
    </Box>
  );
};

export {OrderProductCardContent};