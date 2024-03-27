import styled from "@mui/material/styles/styled";
import {memo} from "react";

const MainLayout = memo(styled('main', { shouldForwardProp: (prop) => prop !== 'open'  })<{
  open?: boolean;
  drawerwidth?:number | string;
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
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
})));

export {MainLayout}