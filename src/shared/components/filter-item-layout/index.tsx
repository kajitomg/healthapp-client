import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {ReactElement} from "react";

interface FilterItemLayoutProps {
  
  title?:string,
  
  open?:boolean,
  
  onClick?:() => void,
  
  children?:ReactElement
  
}

const FilterItemLayout = (props:FilterItemLayoutProps) => {
  return (
    <>
      <ListItemButton onClick={props.onClick}>
        <ListItemText primary={props.title} />
        {props.open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            {props.children}
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export {FilterItemLayout};