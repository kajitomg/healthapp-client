import {IImage} from "../../entities/image/model/image-model.ts";
import {ProductCardMediaX} from "../product-card-media-x";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import {ProductCardMediaY} from "../product-card-media-y";

interface CartProductCardMediaProps {
  
  images?:IImage[]
  
}

const CartProductCardMedia = (props:CartProductCardMediaProps) => {
  const theme = useTheme()
  const isMediaQuerySm = useMediaQuery(theme.breakpoints.down('sm'))
  
  if(!isMediaQuerySm){
    return (
      <ProductCardMediaX image={props.images?.[0]}/>
    );
  }
  return (
    <ProductCardMediaY image={props.images?.[0]}/>
  );
};

export {CartProductCardMedia};