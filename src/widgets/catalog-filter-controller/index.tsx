import {styled} from "@mui/material";
import {useBurger} from "../burger/hooks.ts";
import {CatalogFilter} from "../../features/catalog-filter";
import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';

interface BoxProps extends MuiBoxProps{
  headerHeight:number
}

const StyledBox = styled(MuiBox,{
  shouldForwardProp: (prop) => prop !== 'headerHeight',
})<BoxProps>(({theme,headerHeight}) => ({
  flex:'0 1 300px',
  minHeight:'500px',
  position:'sticky',
  top:`calc(${headerHeight}px + 8px)`,
  margin:theme.spacing(1),
  padding:1,
  backgroundColor:'white',
  borderRadius:4,
  boxShadow:theme.shadows[1],
  [theme.breakpoints.down('md')]:{
    top:`auto`,
    position:'relative',
    minHeight:'auto',
    height:'60px',
    flex:'1 1 100%',
    width:`calc(100% - ${theme.spacing(2)})`
  }
}))

const CatalogFilterController = () => {
  const {headerHeight} = useBurger()
  
  return (
    <StyledBox headerHeight={headerHeight}>
      <CatalogFilter/>
    </StyledBox>
  );
};

export {CatalogFilterController};