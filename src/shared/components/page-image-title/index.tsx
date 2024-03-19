import {Typography, TypographyProps} from "@mui/material";

const PageImageTitle = (props:TypographyProps) => {
  
  return (
    <Typography fontSize={'xxx-large'} fontWeight={'bold'} color={'whitesmoke'} textAlign={'center'} {...props}>{props.children}</Typography>
  );
};

export {PageImageTitle};