import {alpha, Box, Tab, Tabs, useTheme} from "@mui/material";
import {SyntheticEvent, useCallback} from "react";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectNavIndex} from "../../entities/page-controller/store/page-controller/reducer.ts";
import {blue} from "@mui/material/colors";


const HeaderNavigationMenu = () => {
  const theme = useTheme()
  const {setPage, pages} = useSetPage()
  
  const pageNumber = useTypedSelector(state => selectNavIndex(state))

  const callbacks = {
    onChange:useCallback((event: SyntheticEvent) => {
      event.preventDefault()
      setPage(event.currentTarget.id)
    },[])
  }
  
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={pageNumber === -1 ? false : pageNumber}
        onChange={callbacks.onChange}
        aria-label="nav tabs"
        role="navigation"
      >
        {pages.navList.map((page) =>
          <Tab
            icon={page.icon}
            key={page.id}
            id={page.id}
            component="a"
            wrapped
            sx={{
              [theme.breakpoints.down('lg')]:{
                fontSize:'12px',
              },
              
              '&:hover': {
                backgroundColor: alpha(blue[50], 0.1)
              }
            }}
            label={page.name}
            aria-label={page.name}
          />
        )}
      </Tabs>
    </Box>
  );
};

export {HeaderNavigationMenu};