import {IImage} from "../../entities/image/model/image-model.ts";
import {CardMedia, CardMediaProps} from "@mui/material";
import cardImage from "../../imgaes/card.jpg";
import config from "../../config.ts";


type ProductCardMediaYProps = {
  
  image?:IImage
  
} & Omit<CardMediaProps, 'image'>

const ProductCardMediaY = (props:ProductCardMediaYProps) => {
  const {image, ...defProps} = props
  return (
    <CardMedia
      component="img"
      alt="Изображение товара"
      height="300px"
      src={image ? config.api.baseUrl + '/' + image?.path : cardImage}
      {...defProps}
    />
  );
};

export {ProductCardMediaY}