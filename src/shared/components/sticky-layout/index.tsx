import {styled} from "@mui/material";
import MuiBox from "@mui/material/Box";
import {useBurger} from "../../../widgets/burger/hooks.ts";
import {BoxProps as MuiBoxProps} from "@mui/material/Box/Box";
import {memo} from "react";

interface BoxProps extends MuiBoxProps{
  headerHeight:number
}

const StyledStickyBox = styled(MuiBox,{
  shouldForwardProp: (prop) => prop !== 'headerHeight',
})<BoxProps>(({headerHeight}) => ({
  position:'sticky',
  top:`calc(${headerHeight}px + 8px)`,
}))

export type StickyLayoutProps = MuiBoxProps

const StickyLayout = memo((props:StickyLayoutProps) => {
  const {headerHeight} = useBurger()
  return (
    <StyledStickyBox headerHeight={headerHeight} {...props}>
      {props.children}
    </StyledStickyBox>
  );
});

export {StickyLayout};