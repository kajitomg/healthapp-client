import {IImage} from "../../entities/image/model/image-model.ts";
import {CardMedia, CardMediaProps} from "@mui/material";
import cardImage from "../../imgaes/card.jpg";
import config from "../../config.ts";


type ProductCardMediaXProps = {
  
  image?:IImage
  
} & Omit<CardMediaProps, 'image'>

const ProductCardMediaX = (props:ProductCardMediaXProps) => {
  const {image, ...defProps} = props
  
  return (
    <CardMedia
      component="img"
      alt="Изображение товара"
      sx={{
        width:'160px',
        height:'160px',
        objectFit:'cover',
        maxHeight:'200px',
        maxWidth:'200px'
      }}
      src={image ? config.api.baseUrl + '/' + image?.path : cardImage}
      {...defProps}
    />
  );
};

export {ProductCardMediaX}