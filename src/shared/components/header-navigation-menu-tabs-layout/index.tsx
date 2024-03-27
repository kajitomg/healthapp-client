import {Menu} from "@mui/material";
import {ReactNode} from "react";

interface HeaderNavigationMenuTabsLayoutProps {
  
  anchorEl?:EventTarget & Element | null,
  
  onClose?:() => void
  
  children?:ReactNode,
  
  origin?:'top'
  
}

const HeaderNavigationMenuTabsLayout = (props:HeaderNavigationMenuTabsLayoutProps) => {
  
  const open = Boolean(props.anchorEl);
  
  return (
    <Menu
      anchorEl={props.anchorEl}
      id="account-menu"
      open={open}
      onClose={props.onClose}
      onClick={props.onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: props.origin === 'top' ? 'bottom' : 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: props.origin === 'top' ? 'top' : 'bottom' }}
      
    >
      {props.children}
    </Menu>
  );
};

export {HeaderNavigationMenuTabsLayout};