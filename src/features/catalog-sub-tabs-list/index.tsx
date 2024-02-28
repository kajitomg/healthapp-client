import {useCallback} from "react";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {Box} from "@mui/material";
import {List} from "../../shared/components/list";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {CatalogSubTabsCard} from "../catalog-sub-tabs-card";

interface SubCatalogListProps {
  
  list?:ICategory[]
  
}

const CatalogSubTabsList = (props:SubCatalogListProps) => {
  const {page,pages,setPage} = useSetPage()
  const {setParams} = useParams({page})
  
  const callbacks = {
    
    onTabClick:useCallback((id:number) => {
      setPage('catalog', id.toString())
      setParams({},pages?.list?.find(page => page.id === 'catalog'))
    },[setParams,page]),
    
  }
  
  const renders = {
    item:useCallback((item:ICategory) => (
      <CatalogSubTabsCard item={item} key={item.id} onClick={callbacks.onTabClick}/>
    ),[callbacks.onTabClick])
  }
  
  return (
    <Box display={'flex'} width={'100%'} justifyContent={'flex-start'}>
      <List list={props.list} renderItem={renders.item}/>
    </Box>
  );
};

export {CatalogSubTabsList};