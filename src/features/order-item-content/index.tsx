import {Box, SxProps, Typography} from "@mui/material";
import {IOrder} from "../../entities/order/model/order-model.ts";

interface OrderItemContentProps {
  
  order?:IOrder,
  
  sx?:SxProps,
  
}

const OrderItemContent = (props:OrderItemContentProps) => {
  return (
    <Box sx={props.sx} p={1} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} my={1}>
        <Box my={1}>
          <Box display={'flex'}>
            <Typography fontSize={'small'} fontWeight={'bold'}>Почта:</Typography>
            <Typography fontSize={'small'}>{props.order?.email}</Typography>
          </Box>
          <Box display={'flex'}>
            <Typography fontSize={'small'} fontWeight={'bold'}>Номер:</Typography>
            <Typography fontSize={'small'}>{props.order?.phonenumber}</Typography>
          </Box>
        </Box>
        <Box >
          <Typography fontSize={'small'} fontWeight={'bold'}>Комментарий:</Typography>
          <Typography fontSize={'small'}>{props.order?.comment}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export {OrderItemContent};