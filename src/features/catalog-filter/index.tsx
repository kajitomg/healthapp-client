import {Box, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {CatalogFilterPrice} from "../catalog-filter-price";
import {useCallback, useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";


/*
  Фильтрация по (категория,цена,наличие)..., выбор нескольких категорий
 */
const CatalogFilter = () => {
  const [open, setOpen] = useState(true);
  
  const callbacks = {
    
    onClick: useCallback(() => {
      setOpen(!open);
    },[open]),
  }
  return (
    <Box width={'100%'}>
      <List
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
              <CatalogFilterPrice/>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export {CatalogFilter};