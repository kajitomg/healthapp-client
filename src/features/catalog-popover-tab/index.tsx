import {Box, Button, SxProps} from "@mui/material";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {useCallback} from "react";
import {List} from "../../shared/components/list";
import {blue} from "@mui/material/colors";
import {useLoadCategoryQuery} from "../../entities/product/store/categories/api.ts";

interface CatalogPopoverTabProps {
  
  tab?:ICategory
  
  onHover?:(tab:ICategory) => void,
  
  onClick?:(id:number) => void,
  
  hasChildrens?:boolean,
  
  sx?:SxProps,
  
  size?:"small" | "medium" | "large"
  
}

const CatalogPopoverTab = (props:CatalogPopoverTabProps) => {
  const {data} = useLoadCategoryQuery({
    id:props.tab?.id,
    params:{
      'include[category]':'childrens',
      'include[level]':'',
    }
  })
  
  const callbacks = {
    
    onClick:useCallback(() => {
      props.tab?.id && props.onClick && props.onClick(props.tab?.id)
    },[]),
    
    onMouseEnter:useCallback(() => {
      props.tab && props.onHover && props.onHover(props.tab)
    },[])
    
  }
  
  const renders = {
    item:useCallback((tab:ICategory) => (
      <CatalogPopoverTab tab={tab} key={tab.id} onClick={props.onClick} sx={{
        fontSize:'12px'
      }}/>
    ),[])
  }
  
  return (
    <Box>
      <Button
        color={'inherit'}
        sx={{
          textTransform:'capitalize',
          '&:hover':{
            color:blue[500]
          },
          ...props.sx
        }}
        size={props.size}
        onMouseEnter={callbacks.onMouseEnter}
        onClick={callbacks.onClick}
      >
        {props.tab?.name}
      </Button>
      {props.hasChildrens && data?.item?.childrens &&
        <Box display={'flex'} flexDirection={'column'} flexWrap={'wrap'} maxHeight={'132px'}>
          <List list={data?.item?.childrens} renderItem={renders.item}/>
        </Box>
      }
    </Box>
  );
};

export {CatalogPopoverTab};