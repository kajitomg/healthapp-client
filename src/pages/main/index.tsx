import {Box, IconButton, Typography} from "@mui/material";
import mainImage  from '../../imgaes/main.jpg'
import {FullsizeImageLayout} from "../../shared/components/fullsize-image-layout";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useRef} from "react"
import {MainAbout} from "../../widgets/main-about";
import {MainContentLayout} from "../../shared/components/main-content-layout";


const Main = () => {
  const ref = useRef<HTMLDivElement>(null)
  
  return (
    <Box>
      <FullsizeImageLayout image={mainImage} imageAlt={'Главное изображение'} isIndents={true} sx={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', width:'100%', height:'100%'}}>
        <Box display={'flex'} flexDirection={'column'} maxWidth={'1200px'} margin={'0 auto'} height={'100%'}>
          <Box width={'100%'} display={'flex'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
            <Typography color={'whitesmoke'} fontWeight={'900'} fontSize={'xxx-large'} textAlign={'center'} >Сеть магазинов медицинской техники в Санкт-Петербурге</Typography>
          </Box>
          <Box width={'100%'} display={'flex'} height={'20%'} justifyContent={'center'} alignItems={'center'}>
            <IconButton onClick={() => ref?.current?.scrollIntoView({behavior:"smooth"})} size={'large'}>
              <KeyboardArrowDownIcon sx={{color:'whitesmoke'}} fontSize={'large'}/>
            </IconButton>
          </Box>
        </Box>
      </FullsizeImageLayout>
      <MainContentLayout>
        <MainAbout ref={ref}/>
      </MainContentLayout>
    </Box>
  );
};

export {Main};