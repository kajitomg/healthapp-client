import Box from "@mui/material/Box";
import {CatalogCategoriesList} from "../../widgets/catalog-categories-list";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";



const CatalogCategories = () => {
  const catalog = useTypedSelector(state => state.catalog)
  
  return (
    <Box display={'flex'} width={'100%'} justifyContent={'flex-start'}>
      <CatalogCategoriesList list={catalog.category?.item?.childrens}/>
    </Box>
  );
};

export {CatalogCategories};