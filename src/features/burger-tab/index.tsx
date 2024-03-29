import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {BurgerTabs} from "../burger-tabs";
import {SxProps} from "@mui/system";

interface BurgerTabProps {
  
  tab:any,
  
  selected?:boolean
  
  onClick?:(id:string) => void,
  
  selectable?:boolean,
  
  onPropsClick?:(id:string) => void,
  
  sx?:SxProps,
  
  level?:number,
}

const BurgerTab = (props:BurgerTabProps) => {
  return (
    <Box>
      <ListItem key={props.tab.id} disablePadding onClick={() => props.onClick && props.onClick(props.tab.id)} sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
        <ListItemButton selected={props.selected} sx={{width:'100%', ...props.sx}}>
          {props.selectable && <ListItemIcon>
            <Checkbox
              edge="start"
              checked={props.selected}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': props.tab.id }}
            />
          </ListItemIcon>}
          <ListItemText primary={props.tab.name}/>
          {props.tab?.children?.length > 0 && <span>▾</span>}
        </ListItemButton>
      </ListItem>
      {/*Костыль размаунчивания для сброса внутреннего стейта, FIX*/props.selected && <Collapse in={props.tab?.children?.length > 0 && props.selected} timeout={0} unmountOnExit>
        <BurgerTabs list={props.tab.children} onClick={props.onPropsClick} itemSx={{pl:(props?.level || 0) + 2 }} level={props.level} selectable={props.selectable}/>
      </Collapse>}
    </Box>
  );
};

export {BurgerTab};