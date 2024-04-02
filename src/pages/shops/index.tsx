import mainImage from "../../imgaes/main.jpg";
import Box from "@mui/material/Box";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {ShopsList} from "../../widgets/shops-list";
import {FullheightContentLayout} from "../../shared/components/fullheight-content-layout";
import {PageImageLayout} from "../../shared/components/page-image-layout";
import mainImageSM from "../../imgaes/main_SM.jpg";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

const Shops = () => {
  const {page} = usePage()
  const theme = useTheme()
  const isMediaQueryMd = useMediaQuery(theme.breakpoints.down('md'))
  
  return (
    <Box>
      <PageImageLayout image={mainImage} progressiveImage={mainImageSM} imageAlt={'Изображение'} title={page?.name}/>
      <Box>
        <MainContentLayout>
          <FullheightContentLayout height={isMediaQueryMd ? 100 : 200} sx={{display:'flex'}}>
            <ShopsList sx={{flex:`0 1 ${isMediaQueryMd ?'100%' :'50%'}`}}/>
          </FullheightContentLayout>
        </MainContentLayout>
      </Box>
    </Box>
  );
};

export default Shops;