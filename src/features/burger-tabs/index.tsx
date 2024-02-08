import {useCallback, useState} from "react";
import {List, SxProps} from "@mui/material";
import {BurgerTab} from "../burger-tab";
import {List as MyList} from "../../shared/components/list";

interface BurgerTabsProps {
  
  list:any,
  
  initTabs?:SelectedTabsType,
  
  selectable?:boolean,
  
  tabName:string,
  
  onClick?:(id:string) => void,
  
  itemSx?:SxProps,
  
  level?:number
  
}

export type SelectedTabType = {[id:string | number]:{available:boolean,level:number}}

export type SelectedTabsType = {
  [name:string]:SelectedTabType
}


const BurgerTabs = (props:BurgerTabsProps) => {
  const [selectedTabs, setSelectedTabs] = useState<SelectedTabsType>(props.initTabs || {})

  const callbacks = {
    onClick: useCallback((id:string) => {
      props.onClick && props.onClick(id)
      if(props.selectable){
        setSelectedTabs({...selectedTabs,[props?.tabName]:{...selectedTabs?.[props?.tabName],[id]:{available:!selectedTabs?.[props?.tabName]?.[id]?.available ,level:props.level || 0}}})
      } else {
        setSelectedTabs({...selectedTabs,[props?.tabName]:{[id]:{available:true ,level:props.level || 0}}})
      }
    },[selectedTabs,props?.tabName, props.selectable])
    
  }
  
  const renders = {
    item:useCallback((tab:any) => (
      <BurgerTab
        onClick={callbacks.onClick}
        onPropsClick={props.onClick}
        tab={tab}
        tabName={props.tabName}
        selected={selectedTabs?.[props.tabName]?.[tab.id]?.available || false}
        sx={props.itemSx}
        selectable={props.selectable}
        level={(props?.level || 0) + 1}
        key={tab.id}
      />
    ),[callbacks.onClick, selectedTabs, props.tabName, props.onClick, props.selectable])
  }
  
  return (
    <List component="div" disablePadding>
      <MyList list={props.list} renderItem={renders.item}/>
    </List>
  );
}

export {BurgerTabs}