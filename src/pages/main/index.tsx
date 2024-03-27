import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import mainImage  from '../../imgaes/main.jpg'
import mainImageSM  from '../../imgaes/main_SM.jpg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useRef} from "react"
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {PageImageLayout} from "../../shared/components/page-image-layout";
import MainAbout from "../../widgets/main-about";
import styled from "@mui/material/styles/styled";

const StyledScrollToBottomContainer = styled(Box)(({theme}) => ({
  width:'100%',
  display:'flex',
  height:'auto',
  marginTop:theme.spacing(10),
  marginBottom:theme.spacing(10),
  justifyContent:'center',
  alignItems:'center',
  [theme.breakpoints.down('sm')]: {
    marginTop:theme.spacing(0),
  },
}))


const Main = () => {
  const ref = useRef<HTMLDivElement>(null)
  
  return (
    <Box>
      <PageImageLayout
        image={mainImage}
        progressiveImage={mainImageSM}
        height={undefined}
        imageAlt={'Главное изображение'}
        title={'Сеть магазинов медицинской техники в Санкт-Петербурге'}
      >
        <StyledScrollToBottomContainer>
          <IconButton onClick={() => ref?.current?.scrollIntoView({behavior:"smooth"})} size={'large'}>
            <KeyboardArrowDownIcon sx={{color:'whitesmoke'}} fontSize={'large'}/>
          </IconButton>
        </StyledScrollToBottomContainer>
      </PageImageLayout>
      <MainContentLayout>
        <MainAbout ref={ref}/>
      </MainContentLayout>
    </Box>
  );
};

export default Main;