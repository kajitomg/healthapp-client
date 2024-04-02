import {alpha, AppBar, Box, useMediaQuery, useTheme} from "@mui/material";
import {memo, useEffect} from "react";
import {useBurger} from "../burger/hooks.ts";
import {useActions} from "../../shared/services/redux/hooks/use-actions.ts";
import {blue} from "@mui/material/colors";
import {HeaderHomepageButton} from "../../features/header-homepage-button";
import {HeaderHomepageIcon} from "../../features/header-homepage-icon";
import {HeaderBurgerButton} from "../../features/header-burger-button";
import {HeaderNavigationMenu} from "../../features/header-navigation-menu";
import {CatalogSearch} from "../../features/catalog-search";
import {SessionState} from "../../entities/user/store/session/reducer.ts";
import {BurgerBox} from "../../shared/components/burger-box";
import {Burger} from "../burger";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";


interface HeaderContentProps {
  
  setPage?:(id:string) => void,
  
  session?:SessionState,
  
  isBurgerOpen?:boolean
  
}

const HeaderContent =  memo((props:HeaderContentProps) => {
  const theme = useTheme();
  const {page} = usePage()
  const isMediaQueryMd = useMediaQuery(theme.breakpoints.down('md'))
  const isMediaQuerySm = useMediaQuery(theme.breakpoints.down('sm'))
  
  const { headerHeight,drawerWidth} = useBurger()
  
  const {popSnap} = useActions()
  
  useEffect(() => {
    if(isMediaQueryMd){
      popSnap.open({id:'bottom-navigation-available'})
    }else{
      popSnap.close({id:'bottom-navigation-available'})
    }
  },[isMediaQueryMd])
  
  
  return (
    <>
      <AppBar color={'default'} elevation={0} variant={'elevation'} sx={{background:alpha(blue[50], 0.4),backdropFilter:'blur(5px)'}}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} height={headerHeight}>
          <BurgerBox drawerWidth={drawerWidth} position={'relative'} display={'flex'} open={props.isBurgerOpen} sx={{background:blue[500]}} height={'100%'} alignItems={'center'} paddingX={isMediaQuerySm ?1:3} justifyContent={'space-between'}>
            <HeaderBurgerButton isAvailable={isMediaQueryMd && (page?.id === 'like' || page?.id === 'order')}/>
            <HeaderHomepageButton onClick={props.setPage}>
              <HeaderHomepageIcon/>
            </HeaderHomepageButton>
          </BurgerBox>
          <Box paddingX={isMediaQuerySm ? 1:3} display={'flex'} alignItems={'center'} flex={'1 1 auto'}>
            <Box flex={'0 1 100%'}>
              <CatalogSearch/>
            </Box>
            {!isMediaQueryMd &&
              <Box>
                <HeaderNavigationMenu/>
              </Box>
            }
          </Box>
        </Box>
      </AppBar>
      <Burger isOpen={props.isBurgerOpen}/>
    </>
  );
});

export {HeaderContent};