import {ProductCardMediaY} from "../product-card-media-y";
import {IImage} from "../../entities/image/model/image-model.ts";

interface OrderProductCardMediaaProps {
  
  images?:IImage[]
  
}

const OrderProductCardMedia = (props:OrderProductCardMediaaProps) => {
  return (
    <ProductCardMediaY image={props.images?.[0]} sx={{
      height:'50px'
    }}/>
  );
};

export {OrderProductCardMedia};