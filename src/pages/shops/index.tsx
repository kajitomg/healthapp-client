import {FullsizeImageLayout} from "../../shared/components/fullsize-image-layout";
import mainImage from "../../imgaes/main.jpg";
import {Box, Typography} from "@mui/material";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {ShopsList} from "../../widgets/shops-list";
import {FullheightContentLayout} from "../../shared/components/fullheight-content-layout";

const Shops = () => {
  const {page} = useSetPage()
  return (
    <Box>
      <FullsizeImageLayout image={mainImage} imageAlt={'Изображение'} height={200} isIndents={true}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography fontSize={'xxx-large'} color={'whitesmoke'}>{page?.name || 'Избранное'}</Typography>
        </Box>
      </FullsizeImageLayout>
      <Box>
        <MainContentLayout>
          <FullheightContentLayout height={200} sx={{display:'flex'}}>
            <ShopsList sx={{flex:'0 1 50%'}}/>
          </FullheightContentLayout>
        </MainContentLayout>
      </Box>
    </Box>
  );
};

export default Shops;