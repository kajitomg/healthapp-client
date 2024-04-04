import {alpha} from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import useTheme from "@mui/material/styles/useTheme";
import {SyntheticEvent, useCallback, useMemo, useState} from "react";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectNavIndex} from "../../entities/page-controller/store/page-controller/reducer.ts";
import {blue} from "@mui/material/colors";
import {HeaderNavigationMenuTabsProfile} from "../header-navigation-menu-tabs-profile";
import {BadgeIcon} from "../../shared/components/badge-icon";
import {useTabs} from "../../entities/tabs-controller/hooks/use-tabs.ts";
import {TabPanel} from "../../entities/tabs-controller/components/tab-panel";
import {useCatalog} from "../../entities/catalog/hooks/use-catalog.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";


const HeaderNavigationMenu = () => {
  const theme = useTheme()
  const {setPage, pages} = usePage()
  const [menuAnchor,setMenuAnchor] = useState<null | {[id:string]:EventTarget & Element}>(null)
  const likeState = useTypedSelector(state => state.like)
  const cartState = useTypedSelector(state => state.cart)
  const {loadCatalogProducts} = useCatalog()
  const {params} = useParams({page:pages.list.find(page => page.id === 'catalogItems')})
  
  const badgeData = useMemo<{[name:string]:number}>(() => ({
    cart:cartState.products.list?.length || 0,
    like:likeState.products.list?.length || 0
  }),[cartState.products.list,likeState.products.list])

  const pageNumber = useTypedSelector(state => selectNavIndex(state))

  const callbacks = {
    
    setProducts:useCallback(() => {
      loadCatalogProducts({
        params:params,
        query:{paginationPageId:1}
      })
    },[loadCatalogProducts,params]),
    
    onChange:useCallback((event: SyntheticEvent) => {
      event.preventDefault()
      if(event.currentTarget.role === 'menu'){
        return callbacks.onMenuClick(event)
      }
      if(event.currentTarget.id === 'catalogItems'){
        callbacks.setProducts()
      }
      setPage(event.currentTarget.id)
    },[loadCatalogProducts,params]),
    
    onMenuClick:useCallback((event: SyntheticEvent) => {
      setMenuAnchor({[event.currentTarget.id]:event.currentTarget})
      setTab(event)
    },[]),
    
    onMenuClose:useCallback(() => {
      setMenuAnchor(null)
    },[]),
  }
  
  const {available,setTab,list} = useTabs({
    name:'header-navigation-menu',
    tabs:[
      {id:'profile',label:'Профиль',component:<HeaderNavigationMenuTabsProfile anchorEl={menuAnchor?.['profile']} onClose={callbacks.onMenuClose}/>},
    ]
  },[menuAnchor,callbacks.onMenuClose])
  
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
            icon={<BadgeIcon
              icon={page.icon}
              badge={Boolean(badgeData[page.id])}
              content={badgeData[page.id]}
            />}
            key={page.id}
            id={page.id}
            component="a"
            wrapped
            sx={{
              [theme.breakpoints.down('lg')]:{
                fontSize:'12px',
                padding:0.5,
              },
              
              '&:hover': {
                backgroundColor: alpha(blue[50], 0.1)
              },
            }}
            label={page.name}
            onClick={page.menu ? callbacks.onChange : undefined}
            role={page.menu ? 'menu' : 'button'}
            aria-label={page.name}
          />
        )}
      </Tabs>
      <TabPanel available={available} list={list}/>
    </Box>
  );
};

export {HeaderNavigationMenu};