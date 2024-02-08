import {Box} from "@mui/material";
import {useLoadCategoriesQuery} from "../../entities/product/store/categories/api.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useBurger} from "../burger/hooks.ts";
import {ProductsFilter} from "../../features/products-filter";
import {ProductsSearch} from "../../features/products-search";
import {ProductsSort} from "../../features/products-sort";

const ProductsController = () => {
  const categories = useTypedSelector(state => state.categories)
  const {headerHeight} = useBurger()
  useLoadCategoriesQuery({})
  
  
  return (
    <Box
      flex={'1 0 300px'}
      minHeight={'500px'}
      position={'sticky'}
      top={`calc(${headerHeight}px + 8px)`}
      margin={1}
      padding={1}
      sx={{backgroundColor:'white'}}
      borderRadius={1}
      boxShadow={theme => theme.shadows[1]}
    >
      <ProductsSearch/>
      <ProductsFilter list={categories.list}/>
      <ProductsSort/>
    </Box>
  );
};

export {ProductsController};