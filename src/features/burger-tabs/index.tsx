import {useCallback, useEffect, useState} from "react";
import {List, SxProps} from "@mui/material";
import {BurgerTab} from "../burger-tab";
import {List as MyList} from "../../shared/components/list";

interface BurgerTabsProps {
  
  list:any,
  
  selectable?:boolean,
  
  onClick?:(id:string) => void,
  
  itemSx?:SxProps,
  
  level?:number
  
}

export type SelectedTabType = {[id:string | number]:{available:boolean,level:number}}

const BurgerTabs = (props:BurgerTabsProps) => {
  const [unmount, setUnmount] = useState(false)
  const [selectedTabs, setSelectedTabs] = useState<SelectedTabType>({})
  const callbacks = {
    onClick: useCallback( (id:string) => {
      props.onClick && props.onClick(id)
      if(props.selectable){
        setSelectedTabs({[id]:{available:!selectedTabs?.[id]?.available ,level:props.level || 0}})
      } else {
        setUnmount(true)
        setSelectedTabs({[id]:{available:true ,level:props.level || 0}})
      }
    },[selectedTabs, props.selectable, props.level, props.onClick])
  }
  
  useEffect(() => {
    if(unmount){
      setUnmount(false)
    }
  },[unmount])
  
  
  const renders = {
    item:useCallback((tab:any) => (
      <BurgerTab
        onClick={callbacks.onClick}
        onPropsClick={props.onClick}
        tab={tab}
        selected={unmount ? false : selectedTabs?.[tab.id]?.available || false}
        sx={props.itemSx}
        selectable={props.selectable}
        level={(props?.level || 0) + 1}
        key={tab.id}
      />
    ),[callbacks.onClick, selectedTabs, props.onClick, props.selectable,setSelectedTabs,props.level,props.itemSx,unmount])
  }
  
  return (
    <List component="div" disablePadding>
      <MyList list={props.list} renderItem={renders.item}/>
    </List>
  );
}

export {BurgerTabs}