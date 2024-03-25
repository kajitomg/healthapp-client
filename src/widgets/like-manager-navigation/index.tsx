import {Tabs} from "../../entities/tabs-controller/components/tabs";
import {useTheme} from "@mui/material";
import {TabsControllerElementState} from "../../entities/tabs-controller/store/tabs-controller/reducer.ts";
import {ManagerStickyLayout} from "../../shared/components/manager-layout-sticky";
import {memo} from "react";

interface LikeManagerNavigationProps {
  
  available?:number,
  
  setTab?:(event?: React.SyntheticEvent, index?: number) => void,
  
  list?:TabsControllerElementState[]
}

const LikeManagerNavigation =  memo((props:LikeManagerNavigationProps) => {
  const theme = useTheme()
  
  return (
    <ManagerStickyLayout sx={{
      p:0,
      [theme.breakpoints.down('md')]:{
        top:`auto`,
        position:'relative',
        minHeight:'auto',
        height:'60px',
        flex:'1 1 100%',
        width:`calc(100% - ${2})`
      }
    }}>
      <Tabs available={props.available} setTab={props.setTab} list={props.list}/>
    </ManagerStickyLayout>
  );
});

export {LikeManagerNavigation};