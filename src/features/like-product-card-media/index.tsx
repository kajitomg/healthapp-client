import {IImage} from "../../entities/image/model/image-model.ts";
import {ProductCardMediaX} from "../product-card-media-x";

interface LikeProductCardMediaProps {

  images?:IImage[]
  
}

const LikeProductCardMedia = (props:LikeProductCardMediaProps) => {
  
  return (
    <ProductCardMediaX image={props.images?.[0]}/>
  );
};

export {LikeProductCardMedia};