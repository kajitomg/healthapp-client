import {Box, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {CatalogFilterPrice} from "../catalog-filter-price";
import {useCallback, useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {IProduct} from "../../entities/product/model/product-model.ts";

interface CatalogFilterProps {
  
  list:IProduct[]
  
}

const CatalogFilter = (props:CatalogFilterProps) => {
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
        <ListItemButton onClick={callbacks.onClick}>
          <ListItemText primary="Цена" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton>
              <CatalogFilterPrice list={props.list}/>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export {CatalogFilter};