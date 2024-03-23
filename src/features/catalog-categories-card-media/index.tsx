import config from "../../config.ts";
import cardImage from "../../imgaes/card.jpg";
import CardMedia from "@mui/material/CardMedia";
import {IImage} from "../../entities/image/model/image-model.ts";

interface CatalogCategoriesCardMediaProps {
  
  images?:IImage[]
  
}

const CatalogCategoriesCardMedia = (props:CatalogCategoriesCardMediaProps) => {
  return (
    <CardMedia
      component="img"
      alt="Изображение категории"
      height="220px"
      src={props.images?.[0] ? config.api.baseUrl + '/' + props.images?.[0]?.path : cardImage}
    />
  );
};

export {CatalogCategoriesCardMedia};