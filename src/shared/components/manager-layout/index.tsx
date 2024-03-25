import {BoxProps} from "@mui/material/Box/Box";
import {styled} from "@mui/material";
import MuiBox from "@mui/material/Box";
import {memo} from "react";


const StyledManagerBox = styled(MuiBox)<BoxProps>(({theme}) => ({
  margin:theme.spacing(1),
  padding:theme.spacing(1),
  backgroundColor:'white',
  borderRadius:theme.spacing(0.5),
  boxShadow:theme.shadows[1],
}))

type ManagerLayoutProps = BoxProps

const ManagerLayout = memo((props:ManagerLayoutProps) => {
  
  return (
    <StyledManagerBox {...props}>
      {props.children}
    </StyledManagerBox>
  );
});

export {ManagerLayout};