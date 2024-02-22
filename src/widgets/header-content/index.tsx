import {alpha, AppBar, Box, useMediaQuery, useTheme} from "@mui/material";
import {useCallback, useEffect} from "react";
import {useBurger} from "../burger/hooks.ts";
import {useActions} from "../../shared/services/redux/hooks/use-actions.ts";
import {blue} from "@mui/material/colors";
import {HeaderHomepageButton} from "../../features/header-homepage-button";
import {HeaderHomepageIcon} from "../../features/header-homepage-icon";
import {SignoutButton} from "../../features/signout-button";
import {useSignoutMutation} from "../../entities/user/store/session/api.ts";
import {HeaderSessiondataButton} from "../../features/header-sessiondata-button";
import {HeaderBurgerButton} from "../../features/header-burger-button";
import {HeaderNavigationMenu} from "../../features/header-navigation-menu";
import {CatalogSearch} from "../../features/catalog-search";
import {SessionState} from "../../entities/user/store/session/reducer.ts";


interface HeaderContentProps {
  
  setPage?:(id:string) => void,
  
  session?:SessionState,
  
  isBurgerOpen?:boolean
  
}

const HeaderContent = (props:HeaderContentProps) => {
  const theme = useTheme();
  const isBottomNavigationAvailable = useMediaQuery(theme.breakpoints.down('md'))
  
  const {BurgerBox, headerHeight} = useBurger()
  
  const {popSnap} = useActions()
  
  const [signout] = useSignoutMutation()
  
  useEffect(() => {
    if(isBottomNavigationAvailable){
      popSnap.open({id:'bottom-navigation-available'})
    }else{
      popSnap.close({id:'bottom-navigation-available'})
    }
  },[isBottomNavigationAvailable])
  
  const callbacks = {
    
    signOut: useCallback(() => {
      signout()
    },[]),
    
  }
  
  return (
    <AppBar color={'default'} elevation={0} variant={'elevation'} sx={{background:alpha(blue[50], 0.4),backdropFilter:'blur(5px)'}}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} height={headerHeight}>
        <BurgerBox position={'relative'} display={'flex'} open={props.isBurgerOpen} sx={{background:blue[500]}} height={'100%'} alignItems={'center'} paddingX={3} justifyContent={'space-between'}>
          <HeaderBurgerButton/>
          <HeaderHomepageButton onClick={props.setPage}>
            <HeaderHomepageIcon/>
          </HeaderHomepageButton>
        </BurgerBox>
        <Box paddingX={3} display={'flex'} alignItems={'center'} flex={'1 0 auto'}>
          <Box flex={'1 1 100%'}>
            <CatalogSearch/>
          </Box>
          {!isBottomNavigationAvailable &&
            <Box>
              <HeaderNavigationMenu/>
            </Box>
          }
          <Box marginX={props?.session?.exists || props?.session?.waiting ? 3 : 0} display={'flex'} alignItems={'center'}>
            <HeaderSessiondataButton session={props?.session}/>
          </Box>
          <Box marginX={props?.session?.exists ? 3 : 0} display={'flex'} alignItems={'center'}>
            <SignoutButton onClick={callbacks.signOut} isAvailable={props?.session?.exists}/>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

export {HeaderContent};