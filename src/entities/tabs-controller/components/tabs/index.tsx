import React from 'react';
import {Tab, Tabs as MuiTabs} from "@mui/material";
import {TabsControllerElementState} from "../../store/tabs-controller/reducer.ts";

interface TabsProps {
  
  list?:TabsControllerElementState[]
  
  available?:number,
  
  setTab?:(event: React.SyntheticEvent, newValue: number) => void
}

const Tabs = (props:TabsProps) => {

  return (
    <MuiTabs
      variant={'fullWidth'}
      orientation="vertical"
      aria-label='Вертикальный таб'
      value={props.available || 0}
      onChange={props.setTab}
      sx={{
        borderRight: 1,
        borderColor: 'divider'
      }}
    >
      {props.list?.map((item:TabsControllerElementState) =>
        <Tab label={item?.label} key={item.label} sx={{textTransform:'capitalize'}}/>
      )}
    </MuiTabs>
  );
};

export {Tabs};