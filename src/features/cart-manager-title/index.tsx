import {ReactNode} from 'react';
import {Box, Typography} from "@mui/material";

interface CartManagerTitleProps {
  
  title?:string,
  
  children?:ReactNode
  
}

const CartManagerTitle = (props:CartManagerTitleProps) => {
  
  return (
    <Box mb={3}>
      <Typography fontWeight={'bolder'} fontSize={'large'}>{props.title}</Typography>
      <Box>{props.children}</Box>
    </Box>
  );
};

export {CartManagerTitle};