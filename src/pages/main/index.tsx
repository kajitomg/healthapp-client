import {Box, IconButton, Typography} from "@mui/material";
import mainImage  from '../../imgaes/main.jpg'
import {pagesData} from "../../mock/data.ts";
import {blue} from "@mui/material/colors";
import {FullsizeImageLayout} from "../../shared/components/fullsize-image-layout";
import aboutImage  from '../../imgaes/about.jpeg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useRef} from "react"

const Main = () => {
  const ref = useRef<HTMLInputElement>(null)
  
  return (
    <Box >
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
      <Box display={'flex'} maxWidth={'1200px'} margin={'0 auto'} ref={ref}>
        <Box display={'flex'} height={'1080px'}  alignItems={'center'}>
          <Box sx={{maxWidth:'700px'}} padding={3}>
            <Typography color={blue[500]} fontSize={'80px'}>О нас</Typography>
            <Typography color={'black'} fontSize={"medium"}>{pagesData.about.title}</Typography>
          </Box>
          <Box padding={3}>
            <img alt={'Доверие'} src={aboutImage} width={'100%'} height={'100%'} style={{objectFit:'cover'}}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export {Main};