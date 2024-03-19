import {Box, useTheme} from "@mui/material";
import {LikeManager} from "../like-manager";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {LikeList} from "../like-list";
import {useTabs} from "../../entities/tabs-controller/hooks/use-tabs.ts";
import {Tabs} from "../../entities/tabs-controller/components/tabs";
import {TabPanel} from "../../entities/tabs-controller/components/tab-panel";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {OrderList} from "../order-list";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {StickyLayout} from "../../shared/components/sticky-layout";

interface LikeProductsProps {
  
  products?:IProduct[],
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,

}

const LikeProducts = (props:LikeProductsProps) => {
  const theme = useTheme()
  const {page} = useSetPage()
  const {available,setTab,list} = useTabs({
    name:'product',
    tabs:[
      {id:'like',label:'Избранное',page:'like',component:<Box>
          {props.products && props.products.length > 0 && <LikeManager list={props.products}/>}
          <LikeList list={props.products} likeProps={props.likeProps} cartProps={props.cartProps}/>
        </Box>},
      {id:'order',label:'Заказы',page:'order',component:<Box><OrderList/></Box>}
    ],
    availableId:page?.id
  },[props,page])
  return (
    <Box display={'flex'} alignItems={'flex-start'} position={'relative'} pt={2}>
      <StickyLayout sx={{
        flex:'0 1 200px',
        minWidth:'200px',
        margin:1,
        [theme.breakpoints.down('md')]:{
          top:`auto`,
          position:'relative',
          minHeight:'auto',
          height:'60px',
          flex:'1 1 100%',
          width:`calc(100% - ${2})`
        }
      }}>
        <Tabs available={available} setTab={setTab} list={list}/>
      </StickyLayout>
      <Box flex={'1 1 100%'}>
        <TabPanel available={available} list={list}/>
      </Box>
    </Box>
  );
};

export {LikeProducts};