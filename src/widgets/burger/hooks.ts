import {styled} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";



export const useBurger = () => {
  const theme = useTheme()
  const isHeaderSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const drawerWidth = 240
  const headerHeight = isHeaderSmall ? 50 : 64
  const name = 'burger'
  
    
    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding:headerHeight / 8,
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    }));
    
    return {drawerWidth,headerHeight,DrawerHeader,name}
}