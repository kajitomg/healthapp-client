import {Box, IconButton} from "@mui/material";
import mainImage  from '../../imgaes/main.jpg'
import mainImageSM  from '../../imgaes/main_SM.jpg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useRef} from "react"
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {PageImageLayout} from "../../shared/components/page-image-layout";
import MainAbout from "../../widgets/main-about";


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
        <Box width={'100%'} display={'flex'} height={'auto'} my={10} justifyContent={'center'} alignItems={'center'}>
          <IconButton onClick={() => ref?.current?.scrollIntoView({behavior:"smooth"})} size={'large'}>
            <KeyboardArrowDownIcon sx={{color:'whitesmoke'}} fontSize={'large'}/>
          </IconButton>
        </Box>
      </PageImageLayout>
      <MainContentLayout>
        <MainAbout ref={ref}/>
      </MainContentLayout>
    </Box>
  );
};

export default Main;