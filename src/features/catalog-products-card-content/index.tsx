import {Box, Typography} from "@mui/material";
import {ProductCardName} from "../product-card-name";
import {ProductCardDescription} from "../product-card-description";

interface CatalogProductsCardContentProps {
  
  name?:string,
  
  description?:string,
  
  article?:string,
  
  count?:number
  
}

const CatalogProductsCardContent = (props:CatalogProductsCardContentProps) => {
  return (
    <Box>
      <ProductCardName name={props.name}/>
      <ProductCardDescription name={props.description}/>
      <Box display={'flex'} justifyContent={'space-between'} >
        <Typography variant="caption" color={'black'}>
          осталось: {props?.count}
        </Typography>
        <Typography variant="caption" color={'black'}>
          артикул: {props?.article}
        </Typography>
      </Box>
    </Box>
  );
};

export {CatalogProductsCardContent};