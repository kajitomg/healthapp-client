import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectNavIndex} from "../../entities/page-controller/store/page-controller/reducer.ts";
import {SyntheticEvent, useCallback, useMemo, useState} from "react";
import {BadgeIcon} from "../../shared/components/badge-icon";
import styled from "@mui/material/styles/styled";
import {useTabs} from "../../entities/tabs-controller/hooks/use-tabs.ts";
import {HeaderNavigationMenuTabsProfile} from "../header-navigation-menu-tabs-profile";
import {TabPanel} from "../../entities/tabs-controller/components/tab-panel";
import {useCatalog} from "../../entities/catalog/hooks/use-catalog.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";

const StyledBottomNavigationMenu = styled(Paper)(({theme}) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex:10000,
  [theme.breakpoints.down('sm')]: {
    height:'50px'
  },
}))

interface BottomNavigationMenuProps {
  isAvailable?:boolean
}

const BottomNavigationMenu = (props:BottomNavigationMenuProps) => {
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
      {id:'profile',label:'Профиль',component:<HeaderNavigationMenuTabsProfile origin={'top'} anchorEl={menuAnchor?.['profile']} onClose={callbacks.onMenuClose}/>},
    ]
  },[menuAnchor,callbacks.onMenuClose])
  
  if(props.isAvailable){
    return (
      <StyledBottomNavigationMenu elevation={3}>
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
              onClick={page.menu ? callbacks.onChange : undefined}
              role={page.menu ? 'menu' : 'button'}
              sx={{
                minWidth:'70px'
              }}
              icon={<BadgeIcon
                icon={page.icon}
                badge={Boolean(badgeData[page.id])}
                content={badgeData[page.id]}
              />}
            />
          )}
        </BottomNavigation>
        <TabPanel available={available} list={list}/>
      </StyledBottomNavigationMenu>
      
    );
  }
  return null
};

export {BottomNavigationMenu};