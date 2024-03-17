import {ReactNode} from 'react';
import {Box, Typography} from "@mui/material";

interface LikeManagerTitleProps {
  
  title?:string,
  
  children?:ReactNode
  
}

const LikeManagerTitle = (props:LikeManagerTitleProps) => {
  
  return (
    <Box mb={3}>
      <Typography fontWeight={'bolder'} fontSize={'large'}>{props.title}</Typography>
      <Box>{props.children}</Box>
    </Box>
  );
};

export {LikeManagerTitle};