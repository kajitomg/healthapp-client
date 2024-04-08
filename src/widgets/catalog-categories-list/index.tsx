import {memo, useCallback} from "react";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {List} from "../../shared/components/list";
import {CatalogCategoriesCard} from "../../features/catalog-categories-card";
import {CatalogCategoriesCardSimple} from "../../features/catalog-categories-card-simple";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import {StyledList} from "../../shared/components/styled-list";

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
    <StyledList minItemWidth={isMediaQuerySm ? '100%' :'250px'} itemsColumns={'auto-fill'} m={1} width={'100%'}>
      <List list={props.list} renderItem={renders.item}/>
    </StyledList>
  );
});

export {CatalogCategoriesList};