import {Box, Typography} from "@mui/material";
import {ReactNode} from "react";

type ManagerTitleProps = {
  
  title?:string,
  
  children?:ReactNode
  
}

const ManagerTitle = (props:ManagerTitleProps) => {
  
  return (
    <Box mb={3}>
      <Typography fontWeight={'bold'} fontSize={'large'}>{props.title}</Typography>
      <Box>{props.children}</Box>
    </Box>
  );
};

export {ManagerTitle};