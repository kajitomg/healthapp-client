import {Box} from "@mui/material";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {List} from "../../shared/components/list";
import {useCallback} from "react";
import {CatalogPopoverTab} from "../catalog-popover-tab";
import {useLoadCategoryQuery} from "../../entities/product/store/categories/api.ts";

interface CatalogPopoverSubTabsProps {
  
  tab?:ICategory,
  
  onClick?:(params:string) => void,
  
}

const CatalogPopoverSubTabs = (props:CatalogPopoverSubTabsProps) => {
  const {data} = useLoadCategoryQuery({
    id:props.tab?.id,
    params:{
      'include[category]':'childrens',
      'include[level]':'',
    }
  })
  
  const renders = {
    item:useCallback((tab:ICategory) => (
      <CatalogPopoverTab tab={tab} key={tab.id} hasChildrens onClick={props.onClick}/>
    ),[props.onClick])
  }
  return (
    <Box>
      <List list={data?.item.childrens} renderItem={renders.item}/>
    </Box>
  );
};

export {CatalogPopoverSubTabs};