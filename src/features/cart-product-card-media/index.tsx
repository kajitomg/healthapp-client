import {IImage} from "../../entities/image/model/image-model.ts";
import {ProductCardMediaX} from "../product-card-media-x";

interface CartProductCardMediaProps {
  
  images?:IImage[]
  
}

const CartProductCardMedia = (props:CartProductCardMediaProps) => {
  return (
    <ProductCardMediaX image={props.images?.[0]}/>
  );
};

export {CartProductCardMedia};