import {TabsControllerElementState} from "../../store/tabs-controller/reducer.ts";

interface TabPanelProps {
  
  list?:TabsControllerElementState[]
  
  available?:number
  
}

const TabPanel = (props:TabPanelProps) => props.list?.[props?.available || 0]?.component || null

export {TabPanel};