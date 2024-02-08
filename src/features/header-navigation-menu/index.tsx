import {Box, Tab, Tabs} from "@mui/material";
import {SyntheticEvent, useCallback} from "react";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectNavIndex} from "../../entities/page-controller/store/page-controller/reducer.ts";

const HeaderNavigationMenu = () => {
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
          <Tab key={page.id} id={page.id} component="a" label={page.name} aria-label={page.name}/>
        )}
      </Tabs>
    </Box>
  );
};

export {HeaderNavigationMenu};