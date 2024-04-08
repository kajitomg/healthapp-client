import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import styled from "@mui/material/styles/styled";
import {IOrder} from "../../entities/order/model/order-model.ts";
import {OrderCardContent} from "../order-card-content";
import {ProductCard} from "../product-card";
import {OrderCardActions} from "../order-card-actions";
import {useMediaQuery} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";


const StyledOrderCard = styled(ProductCard)(({theme}) => ({
  width:'100%',
  '@container (max-width: 562px)': {
    flexDirection:'column-reverse'
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection:'column-reverse'
  },
}))

interface OrderCardProps {
  
  order?:IOrder
  
}

const OrderCard = (props:OrderCardProps) => {
  const {order} = props
  const theme = useTheme()
  const isMediaQuerySm = useMediaQuery(theme.breakpoints.down('sm'))
  
  return (
    <StyledOrderCard>
      <CardContent sx={{
        flex:'1 1 100%'
      }}>
        <OrderCardContent order={order}/>
      </CardContent>
      <Box>
        <Divider orientation={isMediaQuerySm? 'horizontal' :'vertical'}/>
      </Box>
      <CardActions sx={{
        flex:'1 1 200px'
      }}>
        <OrderCardActions order={order}/>
      </CardActions>
    </StyledOrderCard>
    
  );
};

export {OrderCard};