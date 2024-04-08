import {BoxProps as MuiBoxProps} from "@mui/material/Box/Box";
import {styled} from "@mui/material";
import MuiBox from "@mui/material/Box";

interface BoxProps extends MuiBoxProps {
  
  drawerWidth?:number | string
  
  open?: boolean;
  
}

export const BurgerBox = styled(MuiBox, {
  shouldForwardProp: (prop) => prop !== ('open' && 'drawerWidth'),
})<BoxProps>(({ theme, open, drawerWidth }) => ({
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
    [theme.breakpoints.down('md')]: {
      width:'auto',
    },
  }),
}));

