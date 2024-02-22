import {Box, Drawer} from "@mui/material";
import {useCallback} from "react";
import {useBurger} from "./hooks.ts";
import {RoutesType} from "../../entities/page-controller/models.ts";
import {BurgerTabs} from "../../features/burger-tabs";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";

interface BurgerProps {
  
  tabs?:RoutesType[],
  
  setPage?:(id:string) => void,
  
  isOpen?:boolean,
  
  isAvailable?:boolean
  
}


const Burger = (props:BurgerProps) => {
  const {drawerWidth,headerHeight} = useBurger()
  const {pages} = useSetPage()

  const callbacks = {
    closeMenu:useCallback(() => {
    },[]),
    
    setPage:useCallback((id:string) => {
      props.setPage && props.setPage(id)
    },[]),
    
  }
  
  if(props.isAvailable){
    return (
      <Drawer
        anchor={'left'}
        open={props.isOpen}
        variant={'persistent'}
        ModalProps={{
          keepMounted: true,
        }}
        onClose={callbacks.closeMenu}
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor:'whitesmoke',
            top:headerHeight,
            width: drawerWidth,
            boxSizing: 'border-box',
            height:`calc(100% - ${headerHeight}px)`,
          },
        }}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <BurgerTabs list={pages.navList} onClick={callbacks.setPage}/>
        </Box>
      </Drawer>
    );
  }
  return null
};

export {Burger};