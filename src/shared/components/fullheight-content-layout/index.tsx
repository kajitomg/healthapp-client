import {useBurger} from "../../../widgets/burger/hooks.ts";
import {Box, SxProps, Theme} from "@mui/material";
import {memo, ReactNode} from "react";
interface FullheightContentLayoutProps {
  
  children?:ReactNode
  
  sx?:SxProps<Theme> | undefined,
  
  height?:number
  
}
const FullheightContentLayout = memo((props:FullheightContentLayoutProps) => {
  const {headerHeight} = useBurger()
  return (
    <Box position={'relative'} sx={{
      width:'100%',
      height:`calc(100vh - ${headerHeight}px - ${props.height ?props.height:0}px - 48px)`,
      ...props.sx
    }}>
      {props.children}
    </Box>
  );
});

export {FullheightContentLayout};