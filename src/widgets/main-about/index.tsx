import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import {blue} from "@mui/material/colors";
import {pagesData} from "../../mock/data.ts";
import aboutImage from "../../imgaes/about.jpeg";
import aboutImageSM from "../../imgaes/about_SM.jpeg";
import {forwardRef, memo} from "react";
import {ProgressiveImageLoader} from "../../shared/components/progressive-image-loader";

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

//@ts-expect-error Неиспользуемая константа
const MainAbout = memo(forwardRef<HTMLDivElement,MainAboutProps>( (props,ref) => {
  const theme = useTheme()
  
  return (
    <StyledBox ref={ref}>
      <Box sx={{maxWidth:'700px'}} padding={3}>
        <Typography color={blue[500]} fontSize={'80px'}>О нас</Typography>
        <Typography color={'black'} fontSize={"medium"}>{pagesData.about.title}</Typography>
      </Box>
      <Box sx={{[theme.breakpoints.down('md')]:{maxWidth:'700px', minWidth:'500px'}}} padding={3}>
        <ProgressiveImageLoader alt={'Доверие'} src={aboutImage} progressiveSrc={aboutImageSM} width={'100%'} height={'100%'} style={{objectFit:'cover'}}/>
      </Box>
    </StyledBox>
  );
}));

export default MainAbout;