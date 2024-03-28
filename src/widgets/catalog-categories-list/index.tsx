import {memo, useCallback} from "react";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {Box} from "@mui/material";
import {List} from "../../shared/components/list";
import {CatalogCategoriesCard} from "../../features/catalog-categories-card";
import {CatalogCategoriesCardSimple} from "../../features/catalog-categories-card-simple";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

interface CatalogCategoriesListProps {
  
  list?:ICategory[]
  
}

const CatalogCategoriesList = memo((props:CatalogCategoriesListProps) => {
  const theme = useTheme()
  const isMediaQuerySm = useMediaQuery(theme.breakpoints.down('sm'))

  
  const renders = {
    item:useCallback((item:ICategory) => (
      isMediaQuerySm ? <CatalogCategoriesCardSimple item={item} key={item.id}/> : <CatalogCategoriesCard item={item} key={item.id}/>
    ),[isMediaQuerySm])
  }
  
  return (
    <Box display={'flex'} width={'100%'} justifyContent={'flex-start'} flexDirection={isMediaQuerySm ?'column' :'row'}>
      <List list={props.list} renderItem={renders.item}/>
    </Box>
  );
});

export {CatalogCategoriesList};