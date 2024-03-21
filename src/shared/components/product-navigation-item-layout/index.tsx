import {Box, Typography} from "@mui/material";
import {ReactNode} from "react";

interface ProductNavigationItemLayoutProps {
  
  title?:string,
  
  children?:ReactNode
  
}

const ProductNavigationItemLayout = (props:ProductNavigationItemLayoutProps) => {
  return (
    <Box display={'flex'} flexDirection={'column'} width={'100%'}>
      <Box my={2} mb={3}>
        <Typography fontWeight={'bold'} fontSize={'x-large'}>{props.title}</Typography>
      </Box>
      {props.children}
    </Box>
  );
};

export {ProductNavigationItemLayout};