import config from "../../config.ts";
import cardImage from "../../imgaes/card.jpg";
import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";

interface LikeItemMediaProps {

  product?:IProduct
  
}

const LikeItemMedia = (props:LikeItemMediaProps) => {
  
  return (
    <Box width={'150px'} height={'150px'}>
      <img
        alt={'Изображение продукта'}
        src={props.product?.images?.[0] ? config.api.baseUrl + '/' + props.product?.images?.[0]?.path : cardImage}
        style={{
          objectFit:'cover',
          width:'100%',
          height:'100%',
        }}
      />
    </Box>
  );
};

export {LikeItemMedia};