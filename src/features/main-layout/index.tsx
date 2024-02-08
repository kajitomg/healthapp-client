import {styled} from "@mui/material";

const MainLayout = styled('main', { shouldForwardProp: (prop) => prop !== 'open'  })<{
  open?: boolean;
  drawerwidth?:number;
  headerheight?:number;
}>(({ theme, open, drawerwidth, headerheight}) => ({
  padding: theme.spacing(3),
  minHeight:`calc(100% - ${headerheight}px)`,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerwidth}px`,
  }),
}));

export {MainLayout}