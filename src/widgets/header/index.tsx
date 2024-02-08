import {alpha, AppBar, Box, CssBaseline} from "@mui/material";
import {Burger} from "../burger";
import {useCallback} from "react";
import {useBurger} from "../burger/hooks.ts";
import {useActions} from "../../shared/services/redux/hooks/use-actions.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectIsPopSnapOpen} from "../../entities/pop-snap/store/pop-snap/reducer.ts";
import {blue} from "@mui/material/colors";
import {HeaderHomepageButton} from "../../features/header-homepage-button";
import {HeaderHomepageIcon} from "../../features/header-homepage-icon";
import {SignoutButton} from "../../features/signout-button";
import {useSignoutMutation} from "../../entities/user/store/session/api.ts";
import {HeaderSessiondataButton} from "../../features/header-sessiondata-button";
import {HeaderBurgerButton} from "../../features/header-burger-button";
import {HeaderNavigationMenu} from "../../features/header-navigation-menu";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";


interface HeaderProps {
  isBurgerAvailable?:boolean
}

const Header = (props:HeaderProps) => {
  const {setPage} = useSetPage()
  
  const {BurgerBox, name, headerHeight} = useBurger()
  
  const {popSnap} = useActions()
  
  const session = useTypedSelector(state => state.session)
  const isOpen = useTypedSelector(state => selectIsPopSnapOpen(state,name))
  const [signout] = useSignoutMutation()
  
  const callbacks = {
    signOut: useCallback(() => {
      signout()
    },[]),
    
    toggleMenu: useCallback(() => {
      if(isOpen){
        popSnap.close({id:name})
      }else {
        popSnap.open({id:name})
      }
    },[isOpen]),
    
    setPage: useCallback((id:string) => {
      setPage(id)
    },[]),
  }
  
  return (
    <Box display={'flex'}>
      <CssBaseline/>
      <AppBar color={'default'} elevation={0} variant={'elevation'} sx={{background:alpha(blue[50], 0.4),backdropFilter:'blur(5px)'}}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} height={headerHeight}>
          <BurgerBox position={'relative'} display={'flex'} open={isOpen && props.isBurgerAvailable} sx={{background:blue[500]}} height={'100%'} alignItems={'center'} paddingX={3} justifyContent={'space-between'}>
            <HeaderBurgerButton isAvailable={props.isBurgerAvailable}/>
            <HeaderHomepageButton onClick={callbacks.setPage}>
              <HeaderHomepageIcon/>
            </HeaderHomepageButton>
          </BurgerBox>
          <Box paddingX={3} display={'flex'} alignItems={'center'}>
            <Box>
              <HeaderNavigationMenu/>
            </Box>
            <Box marginX={session.exists || session?.waiting ? 3 : 0} display={'flex'} alignItems={'center'}>
              <HeaderSessiondataButton session={session}/>
            </Box>
            <Box marginX={session.exists ? 3 : 0} display={'flex'} alignItems={'center'}>
              <SignoutButton onClick={callbacks.signOut} isAvailable={session.exists}/>
            </Box>
          </Box>
        </Box>
      </AppBar>
      <Burger setPage={callbacks.setPage} isOpen={isOpen} isAvailable={props.isBurgerAvailable}/>
    </Box>
  );
};

export {Header};