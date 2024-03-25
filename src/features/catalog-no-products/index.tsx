import {NoItemsLayout} from "../../shared/components/no-items-layout";

interface CatalogNoProductsProps {
  
  available?:boolean
  
}

const CatalogNoProducts = (props:CatalogNoProductsProps) => {
  return (
    
    <NoItemsLayout title={'Нет соответствующих продуктов'} available={props.available}/>
  );
};

export {CatalogNoProducts};