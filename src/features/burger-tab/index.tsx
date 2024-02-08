import {Box, Checkbox, Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, SxProps} from "@mui/material";
import {BurgerTabs, SelectedTabType} from "../burger-tabs";

interface BurgerTabProps {
  
  tab:any,
  
  tabName:string,
  
  selected?:boolean
  
  onClick?:(id:string) => void,
  
  selectable?:boolean,
  
  onPropsClick?:(id:string) => void,
  
  sx?:SxProps,
  
  level?:number,
  
  initTabs?:SelectedTabType,
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
      <Collapse in={!!props.tab.children && props.selected} timeout={'auto'} unmountOnExit>
        <BurgerTabs list={props.tab.children} tabName={props.tabName} onClick={props.onPropsClick} itemSx={{pl:(props?.level || 0) + 2 }} level={props.level} selectable={props.selectable}/>
      </Collapse>
    </Box>
  );
};

export {BurgerTab};