import {BoxProps} from "@mui/material/Box/Box";
import {styled} from "@mui/material";
import {StickyLayout} from "../sticky-layout";


const StyledManagerStickyBox = styled(StickyLayout)<BoxProps>(({theme}) => ({
  flex:'0 1 250px',
  minWidth:'250px',
  margin:theme.spacing(1),
  padding:theme.spacing(1),
  backgroundColor:'white',
  borderRadius:theme.spacing(0.5),
  boxShadow:theme.shadows[1],
}))

type ManagerStickyLayoutProps = BoxProps

const ManagerStickyLayout = (props:ManagerStickyLayoutProps) => {
  
  return (
    <StyledManagerStickyBox {...props}>
      {props.children}
    </StyledManagerStickyBox>
  );
};

export {ManagerStickyLayout};