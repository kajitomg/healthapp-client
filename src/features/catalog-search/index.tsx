import {alpha, InputBase, Paper} from "@mui/material";
import {blue} from "@mui/material/colors";
import React, {useCallback, useRef} from "react";
import {CatalogPopover} from "../catalog-popover";
import {CatalogPopoverButton} from "../catalog-popover-button";
import {CatalogSearchButton} from "../catalog-search-button";


/*
  Поиск по названию
 */
const CatalogSearch = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLFormElement | null>(null);
  const ref = useRef<HTMLFormElement>(null)
  
  const callbacks = {
    
    onOpenPopover:useCallback(() => {
      setAnchorEl(ref.current);
    },[ref]),
    
    onClosePopover:useCallback(() => {
      setAnchorEl(null);
    },[ref])
  }
  
  return (
    <>
    <CatalogPopover anchorEl={anchorEl} onClose={callbacks.onClosePopover}/>
      <Paper
        ref={ref}
        component="form"
        sx={{
          p: '2px 4px',
          mx: 3,
          display: 'flex',
          boxShadow:'none',
          alignItems: 'center',
          width: 'auto',
          background:alpha(blue[50], 0.3),
          '&:hover':{
            cursor:'pointer',
            boxShadow:(theme) => theme.shadows[5],
          }
        }}
      >
        <CatalogPopoverButton onClick={callbacks.onOpenPopover}/>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск по каталогу"
          inputProps={{ 'aria-label': 'введите название' }}
        />
        <CatalogSearchButton/>
      </Paper>
    </>
  );
};

export {CatalogSearch};