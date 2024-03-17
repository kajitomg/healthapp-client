import {Box, useTheme} from "@mui/material";
import {ProductNavigation} from "../product-navigation";
import {StickyLayout} from "../../shared/components/sticky-layout";

interface LikeNavigationProps {

}

const LikeNavigation = (props:LikeNavigationProps) => {
  const theme = useTheme()
  return (
    <StickyLayout sx={{
      flex:'0 1 250px',
      minWidth:'250px',
      margin:1,
      padding:1,
      [theme.breakpoints.down('md')]:{
        top:`auto`,
        position:'relative',
        minHeight:'auto',
        height:'60px',
        flex:'1 1 100%',
        width:`calc(100% - ${2})`
      }
    }}>
      <Box display={'flex'} alignItems={'flex-start'}>
        <ProductNavigation/>
      </Box>
    </StickyLayout>
  );
};

export {LikeNavigation};