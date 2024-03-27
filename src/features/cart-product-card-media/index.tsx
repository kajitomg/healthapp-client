import {IImage} from "../../entities/image/model/image-model.ts";
import {ProductCardMediaX} from "../product-card-media-x";

interface CartProductCardMediaProps {
  
  images?:IImage[]
  
}

const CartProductCardMedia = (props:CartProductCardMediaProps) => {
  
    return (
      <ProductCardMediaX image={props.images?.[0]} sx={{
        width:'160px',
        height:'160px',
        objectFit:'cover',
        maxHeight:'200px',
        maxWidth:'200px',
        '@container (max-width: 492px)': {
          width:'100%',
          height:'300px',
          objectFit:'cover',
          maxHeight:'none',
          maxWidth:'100%'
        },
      }}/>
    );
};

export {CartProductCardMedia};