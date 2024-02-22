import {Box, Button} from "@mui/material";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {useCallback} from "react";
import {List} from "../../shared/components/list";

interface CatalogPopoverTabProps {
  
  tab?:ICategory
  
  onHover?:(tab:ICategory) => void,
  
  onClick?:(params:string) => void,
  
  hasChildrens?:boolean,
  
}

const CatalogPopoverTab = (props:CatalogPopoverTabProps) => {
  
  const callbacks = {
    
    onClick:useCallback(() => {
      props.tab?.id && props.onClick && props.onClick(props.tab?.id.toString())
    },[]),
    
    onMouseEnter:useCallback(() => {
      props.tab && props.onHover && props.onHover(props.tab)
    },[])
    
  }
  
  const renders = {
    item:useCallback((tab:ICategory) => (
      <CatalogPopoverTab tab={tab} key={tab.id} onClick={props.onClick}/>
    ),[])
  }
  
  return (
    <Box>
      <Button
        color={'inherit'}
        sx={{
          textTransform:'capitalize'
        }}
        onMouseEnter={callbacks.onMouseEnter}
        onClick={callbacks.onClick}
      >
        {props.tab?.name}
      </Button>
      {props.hasChildrens &&
        <Box display={'flex'}>
          <List list={props.tab?.childrens} renderItem={renders.item}/>
        </Box>
      }
    </Box>
  );
};

export {CatalogPopoverTab};