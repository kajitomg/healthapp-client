import {memo, useCallback} from "react";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {Box} from "@mui/material";
import {List} from "../../shared/components/list";
import {CatalogCategoriesCard} from "../../features/catalog-categories-card";

interface CatalogCategoriesListProps {
  
  list?:ICategory[]
  
}

const CatalogCategoriesList = memo((props:CatalogCategoriesListProps) => {

  
  const renders = {
    item:useCallback((item:ICategory) => (
      <CatalogCategoriesCard item={item} key={item.id}/>
    ),[])
  }
  
  return (
    <Box display={'flex'} width={'100%'} justifyContent={'flex-start'}>
      <List list={props.list} renderItem={renders.item}/>
    </Box>
  );
});

export {CatalogCategoriesList};