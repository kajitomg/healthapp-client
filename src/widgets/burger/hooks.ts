import {styled} from "@mui/material";
import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';

export const useBurger = () => {
  const drawerWidth = 240
  const headerHeight = 64
  const name = 'burger'
  
    interface BoxProps extends MuiBoxProps {
      open?: boolean;
    }
    
    const BurgerBox = styled(MuiBox, {
      shouldForwardProp: (prop) => prop !== 'open',
    })<BoxProps>(({ theme, open }) => ({
      width:'auto',
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        width:drawerWidth,
        transition: theme.transitions.create(['width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));
    
    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding:headerHeight / 8,
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    }));
    
    return {drawerWidth,headerHeight,BurgerBox,DrawerHeader,name}
}