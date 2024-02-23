import {useCallback} from "react";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {CatalogPopoverTab} from "../catalog-popover-tab";
import {Box} from "@mui/material";
import {List} from "../../shared/components/list";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";

interface SubCatalogListProps {
  
  list?:ICategory[]
  
}

const CatalogSubTabsList = (props:SubCatalogListProps) => {
  const {page,pages,setPage} = useSetPage()
  const {setParams} = useParams({page})
  
  const callbacks = {
    
    onTabClick:useCallback((params:string) => {
      setPage('catalog')
      setParams({category:params},pages?.list?.find(page => page.id === 'catalog'))
    },[setParams,page]),
    
  }
  
  const renders = {
    item:useCallback((tab:ICategory) => (
      <CatalogPopoverTab tab={tab} key={tab.id} onClick={callbacks.onTabClick}/>
    ),[callbacks.onTabClick])
  }
  
  return (
    <Box>
      <List list={props.list} renderItem={renders.item}/>
    </Box>
  );
};

export {CatalogSubTabsList};