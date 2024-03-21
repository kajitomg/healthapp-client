import {ListItemIcon, MenuItem, MenuItemProps, Typography} from "@mui/material";
import {ReactElement} from "react";

type HeaderNavigationMenuTabsItemProps = {
  
  icon?:ReactElement
  
  text?:string
  
} & MenuItemProps

const HeaderNavigationMenuTabsItem = (props:HeaderNavigationMenuTabsItemProps) => {
  const {icon,text,...defProps} = props
  
  return (
    <MenuItem {...defProps}>
      {icon && <ListItemIcon>
        {icon}
      </ListItemIcon>}
      <Typography>{text}</Typography>
    </MenuItem>
  );
};

export {HeaderNavigationMenuTabsItem};