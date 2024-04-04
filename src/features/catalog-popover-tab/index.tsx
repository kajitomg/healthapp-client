import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {SxProps} from "@mui/material";
import {ICategory} from "../../entities/product/model/category-model.ts";
import {useCallback, useEffect} from "react";
import {List} from "../../shared/components/list";
import {blue} from "@mui/material/colors";
import {useCategory} from "../../entities/product/hooks/use-category.ts";

interface CatalogPopoverTabProps {
  
  tab?:ICategory
  
  onHover?:(tab:ICategory) => void,
  
  onClick?:(id:number) => void,
  
  hasChildrens?:boolean,
  
  sx?:SxProps,
  
  size?:"small" | "medium" | "large"
  
}

const CatalogPopoverTab = (props:CatalogPopoverTabProps) => {
  const {category,loadCategory} = useCategory()
  
  useEffect(() => {
    loadCategory({
      query: {
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
  
  const callbacks = {
    
    onClick:useCallback(() => {
      props.tab?.id && props.onClick && props.onClick(props.tab?.id)
    },[props.tab?.id,props.onClick]),
    
    onMouseEnter:useCallback(() => {
      props.tab && props.onHover && props.onHover(props.tab)
    },[props.onHover,props.tab])
    
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
      {props.hasChildrens && category?.item?.childrens &&
        <Box display={'flex'} flexDirection={'column'} flexWrap={'wrap'} maxHeight={'132px'}>
          <List list={category?.item?.childrens} renderItem={renders.item}/>
        </Box>
      }
    </Box>
  );
};

export {CatalogPopoverTab};