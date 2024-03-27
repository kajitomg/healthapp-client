import {Box, Drawer} from "@mui/material";
import {useCallback} from "react";
import {useBurger} from "./hooks.ts";
import {RoutesType} from "../../entities/page-controller/models.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useTabs} from "../../entities/tabs-controller/hooks/use-tabs.ts";
import {PersonalAccountLike} from "../../pages/personal-account-like";
import {PersonalAccountOrder} from "../../pages/presonal-account-order";
import {Tabs} from "../../entities/tabs-controller/components/tabs";
import {useActions} from "../../shared/services/redux/hooks/use-actions.ts";

interface BurgerProps {
  
  tabs?:RoutesType[],
  
  setPage?:(id:string) => void,
  
  isOpen?:boolean,
  
  isAvailable?:boolean
  
}


const Burger = (props:BurgerProps) => {
  const {drawerWidth,headerHeight,bottomNavigationHeight} = useBurger()
  const {page} = useSetPage()
  const {popSnap} = useActions()
  
  const {name} = useBurger()

  const {available,setTab,list} = useTabs({
    name:'product',
    tabs:[
      {id:'like',label:'Избранное',page:'like',component:<PersonalAccountLike/>},
      {id:'order',label:'Заказы',page:'order',component:<PersonalAccountOrder/>},
    ],
    availableId:page?.id
  },[page])

  const callbacks = {
    closeMenu:useCallback(() => {
    },[]),
    
    setPage:useCallback((event?: (React.SyntheticEvent<Element, Event> | undefined), index?: number) => {
      setTab(event,index)
      
      popSnap.close({id: name})
    },[setTab,popSnap,name]),
  }
  
  if(page?.id === 'like' || page?.id === 'order'){
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
            height:`calc(100% - ${headerHeight}px - ${bottomNavigationHeight}px)`,
          },
        }}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Tabs setTab={callbacks.setPage} list={list} available={available}/>
        </Box>
      </Drawer>
    );
  }
  return null
};

export {Burger};