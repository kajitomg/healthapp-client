import {styled} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";



export const useBurger = () => {
  const theme = useTheme()
  const isHeaderSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isHeaderMd = useMediaQuery(theme.breakpoints.down('md'))
  const drawerWidth = isHeaderMd ? '100%' : 240
  const headerHeight = isHeaderSm ? 50 : 64
  const bottomNavigationHeight = isHeaderSm ? 50 : 56
  const name = 'burger'
  
    
    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      ...theme.mixins.toolbar,
      minHeight:'auto',
      height:headerHeight,
      justifyContent: 'flex-start',
    }));
    
    return {drawerWidth,headerHeight,DrawerHeader,bottomNavigationHeight,name}
}