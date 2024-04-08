import {styled} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import Box from "@mui/material/Box";

interface StyledListProps extends BoxProps {
  
  minItemWidth?:string | number,
  
  itemsColumns?:`auto-fill` | 'auto-fit'
}

export const StyledList = styled(Box, {
  shouldForwardProp: (prop) => prop !== ('minItemWidth' || 'maxItemsColumns'),
})<StyledListProps>(({theme,minItemWidth = '300px', itemsColumns = 'auto-fit'}) => ({
  display:'grid',
  gap:theme.spacing(2),
  gridTemplateColumns:`repeat(${itemsColumns}, minmax(${minItemWidth} ,1fr))`,
  
  [theme.breakpoints.down('sm')]: {
    gap:theme.spacing(1),
  },
}));
