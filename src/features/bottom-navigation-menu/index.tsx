import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectNavIndex} from "../../entities/page-controller/store/page-controller/reducer.ts";
import {SyntheticEvent, useCallback} from "react";

interface BottomNavigationMenuProps {
  isAvailable?:boolean
}

const BottomNavigationMenu = (props:BottomNavigationMenuProps) => {
  const {setPage, pages} = useSetPage()
  
  const pageNumber = useTypedSelector(state => selectNavIndex(state))
  
  const callbacks = {
    onChange:useCallback((event: SyntheticEvent) => {
      event.preventDefault()
      setPage(event.currentTarget.id)
    },[])
  }
  
  if(props.isAvailable){
    return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={pageNumber === -1 ? false : pageNumber}
          onChange={callbacks.onChange}
          aria-label="nav tabs"
          role="navigation"
        >
          {pages.navList.map((page) =>
            <BottomNavigationAction
              key={page.id}
              id={page.id}
              label={page.name}
              aria-label={page.name}
              icon={page?.icon}
            />
          )}
        </BottomNavigation>
      </Paper>
      
    );
  }
  return null
};

export {BottomNavigationMenu};