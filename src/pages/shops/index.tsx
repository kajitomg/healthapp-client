import mainImage from "../../imgaes/main.jpg";
import Box from "@mui/material/Box";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {ShopsList} from "../../widgets/shops-list";
import {FullheightContentLayout} from "../../shared/components/fullheight-content-layout";
import {PageImageLayout} from "../../shared/components/page-image-layout";
import mainImageSM from "../../imgaes/main_SM.jpg";

const Shops = () => {
  const {page} = useSetPage()
  return (
    <Box>
      <PageImageLayout image={mainImage} progressiveImage={mainImageSM} imageAlt={'Изображение'} title={page?.name}/>
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