import {alpha, Box, Tab, Tabs, useTheme} from "@mui/material";
import {SyntheticEvent, useCallback, useState} from "react";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectNavIndex} from "../../entities/page-controller/store/page-controller/reducer.ts";
import {blue} from "@mui/material/colors";
import {ProfileButtonList} from "../profile-button-list";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {BadgeIcon} from "../../shared/components/badge-icon";


const HeaderNavigationMenu = () => {
  const theme = useTheme()
  const {setPage, pages} = useSetPage()
  const [menuAnchor,setMenuAnchor] = useState<null | {[id:string]:EventTarget & Element}>(null)
  const {storage:cartStorage} = useCart()
  const {storage:likeStorage} = useLike()

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
    },[]),
    
    onMenuClose:useCallback(() => {
      setMenuAnchor(null)
    },[]),
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
            icon={<BadgeIcon icon={page.icon} badge={page.id === 'cart' || page.id === 'like'} content={(page.id === 'cart' && cartStorage.length) ||  (page.id === 'like' && likeStorage.length)}/>}
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
            onClick={page.menu ? callbacks.onChange : undefined}
            role={page.menu ? 'menu' : 'button'}
            aria-label={page.name}
          />
        )}
      </Tabs>
      <ProfileButtonList anchorEl={menuAnchor?.['profile']} onClose={callbacks.onMenuClose}/>
    </Box>
  );
};

export {HeaderNavigationMenu};