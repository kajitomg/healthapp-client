import {Box} from "@mui/material";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {List} from "../../shared/components/list";
import {useCallback, useEffect} from "react";
import {CatalogPopoverTab} from "../catalog-popover-tab";
import {blue} from "@mui/material/colors";
import {useCategory} from "../../entities/product/hooks/use-category.ts";

interface CatalogPopoverSubTabsProps {
  
  tab?:ICategory,
  
  onClick?:(id:number) => void,
  
}

const CatalogPopoverSubTabs = (props:CatalogPopoverSubTabsProps) => {
  const {category,loadCategory} = useCategory()
  
  useEffect(() => {
    loadCategory({
      data: {
        id: props.tab?.id
      },
      params: {
        'include[category]': 'childrens',
      },
      options: {
        includeDefaultParams: true
      }
    })
  },[])
  
  const renders = {
    item:useCallback((tab:ICategory) => (
      <CatalogPopoverTab tab={tab} key={tab.id} hasChildrens onClick={props.onClick} sx={{
        fontWeight:700,
        fontSize:'16px',
        lineHeight:'24px',
        '&:hover':{
          bgcolor:'transparent',
          color:blue[500]
        },
      }}/>
    ),[props.onClick])
  }
  return (
    <Box px={1}>
      <List list={category?.item.childrens} renderItem={renders.item}/>
    </Box>
  );
};

export {CatalogPopoverSubTabs};