import cardImage from "../../imgaes/card.jpg";
import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import config from "../../config.ts";

interface OrderProductCardMediaaProps {
  
  product?:IProduct
  
}

const OrderProductCardMedia = (props:OrderProductCardMediaaProps) => {
  return (
    <Box width={'80px'} height={'50px'}>
      <img alt={'Изображение продукта'} src={props?.product?.images?.[0] ? config.api.baseUrl + '/' + props?.product?.images?.[0]?.path : cardImage} style={
        {
          objectFit:'cover',
          width:'100%',
          height:'100%',
        }}
      />
    </Box>
  );
};

export {OrderProductCardMedia};