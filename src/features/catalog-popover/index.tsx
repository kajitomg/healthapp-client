import {alpha} from "@mui/material";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import {CatalogPopoverTabs} from "../catalog-popover-tabs";
import {memo, useCallback, useState} from "react";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {useLoadCategoriesQuery} from "../../entities/product/store/categories/api.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {CatalogPopoverSubTabs} from "../catalog-popover-subtabs";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

interface CatalogPopoverProps {
  
  anchorEl?:HTMLFormElement | null,
  
  onOpen?:() => void,
  
  onClose?:() => void
  
}

const CatalogPopover = memo(({anchorEl = null,onClose}:CatalogPopoverProps) => {
  const {pages, page,setPage} = useSetPage()
  const {setParams} = useParams({page})
  const {data:categories} = useLoadCategoriesQuery({levelId:1})
  const [subTab,setSubTab] = useState<ICategory>()
  const theme = useTheme()
  const isMediaQuerySm = useMediaQuery(theme.breakpoints.up('sm'))
  
  const callbacks = {
    
    onTabClick:useCallback((id:number) => {
      setPage('catalog' , id.toString())
      setParams({},pages.list.find(page => page.id === 'catalog'))
      onClose && onClose()
    },[setParams,setPage,page]),
    
    onTabHover:useCallback((tab:ICategory) => {
      if(!isMediaQuerySm) return
      setSubTab(tab)
    },[isMediaQuerySm])
  }
  
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'catalog-popover' : undefined;

    return (
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          backgroundColor:alpha('#000',0.15)
        }}
      >
        <Box display={'flex'} pt={2}>
          <CatalogPopoverTabs tabs={categories?.list} onHover={callbacks.onTabHover} onClick={callbacks.onTabClick}/>
          {subTab && isMediaQuerySm && <CatalogPopoverSubTabs tab={subTab} onClick={callbacks.onTabClick}/>}
        </Box>
      </Popover>
    );
  
});

export default CatalogPopover;