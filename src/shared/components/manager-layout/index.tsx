import {BoxProps} from "@mui/material/Box/Box";
import {styled} from "@mui/material";
import MuiBox from "@mui/material/Box";


const StyledManagerBox = styled(MuiBox)<BoxProps>(({theme}) => ({
  margin:theme.spacing(1),
  padding:theme.spacing(1),
  backgroundColor:'white',
  borderRadius:theme.spacing(0.5),
  boxShadow:theme.shadows[1],
}))

type ManagerLayoutProps = BoxProps

const ManagerLayout = (props:ManagerLayoutProps) => {
  
  return (
    <StyledManagerBox {...props}>
      {props.children}
    </StyledManagerBox>
  );
};

export {ManagerLayout};