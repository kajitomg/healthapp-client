import {Box, styled, Typography, useTheme} from "@mui/material";
import {blue} from "@mui/material/colors";
import {pagesData} from "../../mock/data.ts";
import aboutImage from "../../imgaes/about.jpeg";
import {forwardRef, Ref} from "react";

interface MainAboutProps {
}

const StyledBox = styled('div')(({theme}) => ({
  display:'flex',
  height:'100vh',
  alignItems:'center',
  [theme.breakpoints.down('md')]:{
    flexDirection:'column',
    width:'100%',
    justifyContent:'center'
  }
}))

const MainAbout = forwardRef((props:MainAboutProps,ref:Ref<HTMLDivElement>) => {
  const theme = useTheme()
  
  return (
    <StyledBox ref={ref}>
      <Box sx={{maxWidth:'700px'}} padding={3}>
        <Typography color={blue[500]} fontSize={'80px'}>О нас</Typography>
        <Typography color={'black'} fontSize={"medium"}>{pagesData.about.title}</Typography>
      </Box>
      <Box sx={{[theme.breakpoints.down('md')]:{maxWidth:'700px'}}} padding={3}>
        <img alt={'Доверие'} src={aboutImage} width={'100%'} height={'100%'} style={{objectFit:'cover'}}/>
      </Box>
    </StyledBox>
  );
});

export {MainAbout};