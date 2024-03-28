import Box from "@mui/material/Box";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {List} from "../../shared/components/list";
import {useCallback} from "react";
import {CatalogPopoverTab} from "../catalog-popover-tab";

interface CatalogPopoverTabsProps {
  
  tabs?:ICategory[],
  
  onClick?:(id:number) => void,
  
  onHover?:(tab:ICategory) => void,
  
}

const CatalogPopoverTabs = (props:CatalogPopoverTabsProps) => {
  
  const renders = {
    item:useCallback((tab:ICategory) => (
      <CatalogPopoverTab tab={tab} key={tab.id} onHover={props.onHover} onClick={props.onClick}/>
    ),[props.onHover,props.onClick])
  }
  
  return (
    <Box>
      <List list={props.tabs} renderItem={renders.item}/>
    </Box>
  );
};

export {CatalogPopoverTabs};