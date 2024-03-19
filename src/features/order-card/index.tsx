import {Box, CardActions, CardContent, Divider, styled} from "@mui/material";
import {IOrder} from "../../entities/order/model/order-model.ts";
import {OrderCardContent} from "../order-card-content";
import {ProductCard} from "../product-card";
import {OrderCardActions} from "../order-card-actions";


const StyledOrderCard = styled(ProductCard)(() => ({
  width:'100%'
}))

interface OrderCardProps {
  
  order?:IOrder
  
}

const OrderCard = (props:OrderCardProps) => {
  const {order} = props
  
  return (
    <StyledOrderCard>
      <CardContent sx={{
        flex:'1 1 100%'
      }}>
        <OrderCardContent order={order}/>
      </CardContent>
      <Box>
        <Divider orientation={'vertical'}/>
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