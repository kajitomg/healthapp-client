import {styled} from "@mui/material";

export const useBurger = () => {
  const drawerWidth = 240
  const headerHeight = 64
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