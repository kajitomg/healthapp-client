import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectNavIndex} from "../../entities/page-controller/store/page-controller/reducer.ts";
import {SyntheticEvent, useCallback, useMemo, useState} from "react";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {BadgeIcon} from "../../shared/components/badge-icon";
import styled from "@mui/material/styles/styled";
import {useTabs} from "../../entities/tabs-controller/hooks/use-tabs.ts";
import {HeaderNavigationMenuTabsProfile} from "../header-navigation-menu-tabs-profile";
import {TabPanel} from "../../entities/tabs-controller/components/tab-panel";

const StyledCartProductCard = styled(Paper)(({theme}) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  [theme.breakpoints.down('sm')]: {
    height:'50px'
  },
}))

interface BottomNavigationMenuProps {
  isAvailable?:boolean
}

const BottomNavigationMenu = (props:BottomNavigationMenuProps) => {
  const {setPage, pages} = useSetPage()
  const {storage:cartStorage} = useCart()
  const {storage:likeStorage} = useLike()
  const [menuAnchor,setMenuAnchor] = useState<null | {[id:string]:EventTarget & Element}>(null)
  

  const badgeData = useMemo<{[name:string]:number}>(() => ({
    cart:cartStorage.length,
    like:likeStorage.length
  }),[cartStorage,likeStorage])
  
  const pageNumber = useTypedSelector(state => selectNavIndex(state))
  
  const callbacks = {
    onChange:useCallback((event: SyntheticEvent) => {
      event.preventDefault()
      if(event.currentTarget.role === 'menu'){
        return callbacks.onMenuClick(event)
      }
      setPage(event.currentTarget.id)
    },[]),
    
    
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
      <StyledCartProductCard elevation={3}>
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
      </StyledCartProductCard>
      
    );
  }
  return null
};

export {BottomNavigationMenu};