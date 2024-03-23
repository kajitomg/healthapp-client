import Box from "@mui/material/Box";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {CatalogCategoriesList} from "../../widgets/catalog-categories-list";

interface CatalogCategoriesProps {
  
  list?:ICategory[]
  
}

const CatalogCategories = (props:CatalogCategoriesProps) => {
  
  return (
    <Box display={'flex'} width={'100%'} justifyContent={'flex-start'}>
      <CatalogCategoriesList list={props.list}/>
    </Box>
  );
};

export {CatalogCategories};