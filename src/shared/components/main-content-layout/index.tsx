import Box from "@mui/material/Box";
import {SxProps} from "@mui/material";
import {memo, ReactNode} from "react";

interface MainContentLayoutProps {
  
  children?:ReactNode,
  
  sx?:SxProps
  
}

const MainContentLayout = memo((props:MainContentLayoutProps) => {
  return (
    <Box display={'flex'} justifyContent={'center'} width={'100%'}>
      <Box maxWidth={'1200px'} width={'100%'} sx={props.sx}>
        {props.children}
      </Box>
    </Box>
  );
});

export {MainContentLayout};