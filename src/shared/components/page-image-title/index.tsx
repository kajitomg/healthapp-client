import {Typography, TypographyProps} from "@mui/material";
import styled from "@mui/material/styles/styled";


const StyledPageImageTitle = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    lineHeight:'60px',
  },
  [theme.breakpoints.down('sm')]: {
    lineHeight:'45px',
  },
}))

const PageImageTitle = (props:TypographyProps) => {
  
  return (
    <StyledPageImageTitle fontSize={'clamp(38px,8vw,60px)'} fontWeight={'bold'} color={'whitesmoke'} textAlign={'center'} {...props}>{props.children}</StyledPageImageTitle>
  );
};

export {PageImageTitle};