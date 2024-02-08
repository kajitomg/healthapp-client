import {Box, Drawer, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useBurger} from "./hooks.ts";
import {RoutesType} from "../../entities/page-controller/models.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useLoadCategoriesQuery} from "../../entities/product/store/categories/api.ts";
import {selectCurrentPage} from "../../entities/page-controller/store/page-controller/reducer.ts";
import {BurgerTabs} from "../../features/burger-tabs";

interface BurgerProps {
  
  tabs?:RoutesType[],
  
  setPage?:(id:string) => void,
  
  isOpen?:boolean,
  
  isAvailable?:boolean
  
}


const Burger = (props:BurgerProps) => {
  const selected = useTypedSelector(state => selectCurrentPage(state))
  const {drawerWidth,headerHeight} = useBurger()
  const categories = useTypedSelector(state => state.categories)
  const pages = useTypedSelector(state => state.pageController)
  const [tabs, setTabs] = useState({})
  const [tab, setTab] = useState<keyof typeof tabs>('catalog')

  useLoadCategoriesQuery({})
  const callbacks = {
    closeMenu:useCallback(() => {
    },[]),
    
    setPage:useCallback((id:string,callback?:() => void) => {
      props.setPage && props.setPage(id)
      return () => {
        console.log(callback)
        callback && callback()
      }
    },[]),
    
    setTab: useCallback((event: React.MouseEvent<HTMLElement>,value: keyof typeof tabs) => {
      setTab(value);
    },[])
  }
  
  
  useEffect(() => {
    setTabs({'navigation':pages.navList,'catalog':categories.list})
  },[pages,categories])
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
          <Box>
            <ToggleButtonGroup
              color="primary"
              value={tab}
              exclusive
              fullWidth
              onChange={callbacks.setTab}
              aria-label="Platform"
            >
              <ToggleButton value='navigation'>Навигация</ToggleButton>
              <ToggleButton value='catalog'>Каталог</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <BurgerTabs list={tabs[tab]} onClick={callbacks.setPage} tabName={tab} initTabs={selected ? {'catalog':{[selected?.id]:{available:true,level:0}}}:{}} selectable={tab === 'catalog'}/>
        </Box>
      </Drawer>
    );
  }
  return null
};

export {Burger};