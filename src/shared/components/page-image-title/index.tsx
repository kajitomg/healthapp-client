import {Typography, TypographyProps} from "@mui/material";
import styled from "@mui/material/styles/styled";


const StyledPageImageTitle = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    lineHeight:'60px'
  },
  [theme.breakpoints.down('sm')]: {
    lineHeight:'54px'
  },
}))

const PageImageTitle = (props:TypographyProps) => {
  
  return (
    <StyledPageImageTitle fontSize={'xxx-large'} fontWeight={'bold'} color={'whitesmoke'} textAlign={'center'} {...props}>{props.children}</StyledPageImageTitle>
  );
};

export {PageImageTitle};