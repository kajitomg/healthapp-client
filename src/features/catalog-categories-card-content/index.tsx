import {Box} from "@mui/material";
import {CategoryCardName} from "../category-card-name";

interface CatalogCategoriesCardContentProps {
  
  name?:string,
  
}

const CatalogCategoriesCardContent = (props:CatalogCategoriesCardContentProps) => {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <CategoryCardName name={props.name}/>
    </Box>
  );
};

export {CatalogCategoriesCardContent};