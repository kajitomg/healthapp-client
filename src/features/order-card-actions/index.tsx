import Box from "@mui/material/Box";
import {SxProps} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IOrder} from "../../entities/order/model/order-model.ts";
import {SecondPrice} from "../second-price";
import {getOrderTotalPrice} from "../../shared/utils/get-order-total-price.ts";
import useTheme from "@mui/material/styles/useTheme";

interface OrderCardActionsProps {
  
  order?:IOrder,
  
  sx?:SxProps,
  
}

const OrderCardActions = (props:OrderCardActionsProps) => {
  const theme = useTheme()
  
  return (
    <Box sx={{
      height:'100%',
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start',
      justifyContent:'space-between',
      '@container (max-width: 562px)': {
        height:'auto',
        width:'100%',
        alignItems:'space-between',
      },
      [theme.breakpoints.down('sm')]: {
        height:'auto',
        width:'100%',
        flexDirection:'row',
        alignItems:'space-between',
      },
    }}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
        <Typography fontSize={'x-small'} fontWeight={'bold'}>Статус:</Typography>
        <Typography fontSize={'small'} fontWeight={'bold'}> {props.order?.status?.value}</Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
        <Typography fontSize={'x-small'} fontWeight={'bold'} mr={'2px'}>Предварительная сумма:</Typography>
        <SecondPrice fontSize={'small'} price={getOrderTotalPrice(props.order?.products)}/>
      </Box>
    </Box>
  );
};

export {OrderCardActions};