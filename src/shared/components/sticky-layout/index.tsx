import {styled, SxProps} from "@mui/material";
import MuiBox from "@mui/material/Box";
import {useBurger} from "../../../widgets/burger/hooks.ts";
import {BoxProps as MuiBoxProps} from "@mui/material/Box/Box";
import {ReactNode} from "react";

interface BoxProps extends MuiBoxProps{
  headerHeight:number
}

const StyledBox = styled(MuiBox,{
  shouldForwardProp: (prop) => prop !== 'headerHeight',
})<BoxProps>(({theme,headerHeight}) => ({
  position:'sticky',
  top:`calc(${headerHeight}px + 8px)`,
  margin:theme.spacing(1),
  padding:1,
  backgroundColor:'white',
  borderRadius:4,
  boxShadow:theme.shadows[1],
}))

interface StickyLayoutProps {
  
  sx?:SxProps,
  
  children?:ReactNode
  
}

const StickyLayout = (props:StickyLayoutProps) => {
  const {headerHeight} = useBurger()
  return (
    <StyledBox headerHeight={headerHeight} sx={props.sx}>
      {props.children}
    </StyledBox>
  );
};

export {StickyLayout};