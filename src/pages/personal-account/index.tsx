import {MainContentLayout} from "../../shared/components/main-content-layout";
import Box from "@mui/material/Box";
import mainImage from "../../imgaes/main.jpg";
import mainImageSM  from '../../imgaes/main_SM.jpg'
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {PageImageLayout} from "../../shared/components/page-image-layout";
import {useTabs} from "../../entities/tabs-controller/hooks/use-tabs.ts";
import {PersonalAccountLike} from "../personal-account-like";
import {PersonalAccountOrder} from "../personal-account-order";
import {LikeManagerNavigation} from "../../widgets/like-manager-navigation";
import {TabPanel} from "../../entities/tabs-controller/components/tab-panel";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const PersonalAccount = () => {
  const {page} = usePage()
  const theme = useTheme()
  const isMediaQueryMd = useMediaQuery(theme.breakpoints.down('md'))
  
  const {available,setTab,list} = useTabs({
    name:'product',
    tabs:[
      {id:'like',label:'Избранное',page:'like',component:<PersonalAccountLike/>},
      {id:'order',label:'Заказы',page:'order',component:<PersonalAccountOrder/>},
    ],
    availableId:page?.id
  },[page])
  
  return (
    <Box>
      <PageImageLayout
        image={mainImage}
        progressiveImage={mainImageSM}
        imageAlt={'Изображение'}
        title={page?.name}
      />
      <MainContentLayout>
        <Box display={'flex'} alignItems={'flex-start'} position={'relative'} pt={2}>
          {!isMediaQueryMd && <LikeManagerNavigation available={available} setTab={setTab} list={list}/>}
          <Box flex={'1 1 100%'}>
            <TabPanel available={available} list={list}/>
          </Box>
        </Box>
      </MainContentLayout>
    </Box>
  );
};

export default PersonalAccount;