import {styled} from "@mui/material";

const FooterLayout = styled('main', { shouldForwardProp: (prop) => prop !== 'open'  })<{
  open?: boolean;
  drawerwidth?:number | string;
}>(({ theme, open, drawerwidth}) => ({
  padding: theme.spacing(3),
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

export {FooterLayout}