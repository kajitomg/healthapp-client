import Box from "@mui/material/Box";
import List from "@mui/material/List";
import {useCallback, useState} from "react";
import {FilterItemLayout} from "../../shared/components/filter-item-layout";
import {CatalogManagerFilterPrice} from "../catalog-manager-filter-price";


const CatalogManagerFilterList = () => {
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
          <CatalogManagerFilterPrice/>
        </FilterItemLayout>
      </List>
    </Box>
  );
};

export {CatalogManagerFilterList};