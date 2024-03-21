import {Box,List} from "@mui/material";
import {useCallback, useState} from "react";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {FilterItemLayout} from "../../shared/components/filter-item-layout";
import {CatalogManagerFilterPrice} from "../catalog-manager-filter-price";

interface CatalogManagerFilterListProps {
  
  list:IProduct[]
  
}

const CatalogManagerFilterList = (props:CatalogManagerFilterListProps) => {
  const [open, setOpen] = useState(true);
  
  const callbacks = {
    
    onClick: useCallback(() => {
      setOpen(!open);
    },[open]),
  }
  
  return (
    <Box width={'100%'}>
      <List
        disablePadding
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <FilterItemLayout open={open} onClick={callbacks.onClick} title={'Цена'}>
          <CatalogManagerFilterPrice list={props.list}/>
        </FilterItemLayout>
      </List>
    </Box>
  );
};

export {CatalogManagerFilterList};