import {alpha} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import {blue} from "@mui/material/colors";
import React, {lazy, memo, Suspense, useCallback, useRef} from "react";
import {CatalogPopoverButton} from "../catalog-popover-button";
import {CatalogSearchButton} from "../catalog-search-button";
import useTheme from "@mui/material/styles/useTheme";
const CatalogPopover = lazy(() => import("../catalog-popover"))

/*
  Поиск по названию
 */
const CatalogSearch = memo(() => {
  const theme = useTheme()
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
      <Suspense fallback={null}>
        <CatalogPopover anchorEl={anchorEl} onClose={callbacks.onClosePopover}/>
      </Suspense>
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
          flex: 1,
          background:alpha(blue[50], 0.3),
          '&:hover':{
            cursor:'pointer',
            boxShadow:(theme) => theme.shadows[5],
          },
          [theme.breakpoints.down('sm')]: {
            mx: 1,
          },
          
        }}
      >
        <CatalogPopoverButton onClick={callbacks.onOpenPopover}/>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            
        }}
          placeholder="Поиск по каталогу"
          inputProps={{ 'aria-label': 'введите название' }}
        />
        <CatalogSearchButton/>
      </Paper>
    </>
  );
});

export {CatalogSearch};