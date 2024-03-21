import {useEffect} from "react";
import {useParams as useReactParams} from "react-router-dom";
import {Box} from "@mui/material";
import {ProductCarousel} from "../../features/product-carousel";
import {ProductData} from "../../features/product-data";
import {ProductDescription} from "../../features/product-description";
import {ProdcutDocuments} from "../../features/product-documents";
import {ProductSpecifications} from "../../features/product-specifications";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {useTabs} from "../../entities/tabs-controller/hooks/use-tabs.ts";
import {Tabs} from "../../entities/tabs-controller/components/tabs";
import {TabPanel} from "../../entities/tabs-controller/components/tab-panel";
import {useProduct} from "../../entities/product/hooks/use-product.ts";
import {ManagerLayout} from "../../shared/components/manager-layout";


const Product = () => {
  const {id} = useReactParams()
  const {loadProduct,product} = useProduct()
  const {available,setTab,list} = useTabs({
    name:'product',
    tabs:[
      {id:'Description',label:'Описание',component:<ProductDescription description={product?.item?.description}/>},
      {id:'Specification',label:'Характеристики',component:<ProductSpecifications specifications={product?.item?.specifications} productId={product?.item.id}/>}
    ]
  },[product])
  
  useEffect(() => {
    loadProduct({
      data:{
        id
      },
      options: {
        includeDefaultParams: true
      }
    })
  },[id])
  
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <MainContentLayout>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box flex={'1 1 100%'} mx={1} display={'flex'} justifyContent={'center'}>
            <ProductCarousel images={product?.item?.images}/>
          </Box>
          <Box flex={'1 1 420px'} minWidth={'420px'}  mx={1}>
            <ProductData data={product?.item}/>
          </Box>
        </Box>
        <Box>
          <ProdcutDocuments documents={product?.item?.documents}/>
        </Box>
          <Box display={'flex'} alignItems={'flex-start'}>
            <ManagerLayout sx={{
              p:0,
              flex:'0 1 250px',
              minWidth:'250px'
            }}>
              <Tabs setTab={setTab} list={list} available={available}/>
            </ManagerLayout>
            <ManagerLayout sx={{
              flex:'1 1 100%',
              minWidth:'250px'
            }}>
              <TabPanel list={list} available={available}/>
            </ManagerLayout>
          </Box>
      </MainContentLayout>
    </Box>
    
  );
};

export default Product;