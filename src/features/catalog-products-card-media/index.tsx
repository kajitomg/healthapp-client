import {IImage} from "../../entities/image/model/image-model.ts";
import {ProductCardMediaY} from "../product-card-media-y";

interface CatalogProductsCardMediaProps {
  
  images?:IImage[]
  
}

const CatalogProductsCardMedia = (props:CatalogProductsCardMediaProps) => {
  return (
    
    <ProductCardMediaY image={props.images?.[0]}/>
  );
};

export {CatalogProductsCardMedia};