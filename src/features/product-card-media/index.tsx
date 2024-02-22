import config from "../../config.ts";
import cardImage from "../../imgaes/card.jpg";
import {CardMedia} from "@mui/material";
import {IImage} from "../../entities/image/model/image-model.ts";

interface ProductCardMediaProps {
  
  images?:IImage[]
  
}

const ProductCardMedia = (props:ProductCardMediaProps) => {
  return (
    <CardMedia
      component="img"
      alt="Изображение товара"
      height="300px"
      src={props.images?.[0] ? config.api.baseUrl + '/' + props.images?.[0]?.path : cardImage}
    />
  );
};

export {ProductCardMedia};