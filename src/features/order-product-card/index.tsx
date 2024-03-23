import {IProduct} from "../../entities/product/model/product-model.ts";
import CardContent from "@mui/material/CardContent";
import styled from "@mui/material/styles/styled";
import {OrderProductCardMedia} from "../order-product-card-media";
import {OrderProductCardContent} from "../order-product-card-content";
import {ProductCard} from "../product-card";

const StyledOrderProductCard = styled(ProductCard)(() => ({
  display:'flex',
  minWidth:'80px',
  flexDirection:'column',
}))

interface OrderProductCardProps {
  
  item?:IProduct
  
}

const OrderProductCard = (props:OrderProductCardProps) => {
  const {item} = props
  
  return (
    <StyledOrderProductCard productId={item?.id}>
      <OrderProductCardMedia images={item?.images}/>
      <CardContent sx={{
        p:1
      }}>
        <OrderProductCardContent name={item?.name}/>
      </CardContent>
    </StyledOrderProductCard>
  );
};

export {OrderProductCard};