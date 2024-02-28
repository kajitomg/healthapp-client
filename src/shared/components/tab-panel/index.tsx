import {Box, Typography} from "@mui/material";
import {ReactNode} from "react";

interface TabPanelProps {
  
  value?:number,
  
  index?:number,
  
  children?:ReactNode
}

const TabPanel = (props:TabPanelProps) => {
  
  return (
    <div
      role="tab-panel"
      hidden={props.value !== props.index}
      id={`vertical-tab-panel-${props.index}`}
      aria-labelledby={`vertical-tab-${props.index}`}
    >
      {props.value === props.index && (
        <Box sx={{ p: 3 }}>
          {props.children}
        </Box>
      )}
    </div>
  );
};

export {TabPanel};