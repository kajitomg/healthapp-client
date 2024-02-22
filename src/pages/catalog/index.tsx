import {Box, Skeleton, Typography} from "@mui/material";
import mainImage  from '../../imgaes/main.jpg';
import {FullsizeImageLayout} from "../../shared/components/fullsize-image-layout";
import {useSetParams} from "../../entities/params-controller/hooks/use-set-params.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useLoadProductsQuery} from "../../entities/product/store/products/api.ts";
import {CatalogProducts} from "../../widgets/catalog-products";
import {CatalogSubTabs} from "../../widgets/catalog-sub-tabs";
import {useLazyLoadCategoryQuery} from "../../entities/product/store/categories/api.ts";
import {useEffect} from "react";


const Catalog = () => {
  const {page} = useSetPage()
  const {params} = useSetParams({page})
  const [loadCategory,categoryData] = useLazyLoadCategoryQuery()
  
  
  const {data:products, refetch} = useLoadProductsQuery({
    ...(params?.['filter[price]'] && {'filter[price]':params?.['filter[price]']}),
    'include[category]':'',
    ...(categoryData?.currentData?.item?.id && {'where[category][id]':categoryData?.currentData?.item?.id}),
    'include[image]':'',
    'include[document]':'',
    'include[specification]':'specifications',
    ...(params?.sort && {[`sort[${Object.keys(JSON.parse(params?.sort))[0]}]`]:JSON.parse(params?.sort)?.[Object.keys(JSON.parse(params?.sort))[0]]})
  })
  
  useEffect(() => {
    if(params?.category){
      loadCategory({
        id:params?.category,
        params:{
          'include[category]':'childrens',
          'include[product]':'',
          'include[level]':'',
        }
      })
    }
  },[params?.category])
  useEffect(() => {
    refetch()
  },[params])
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <FullsizeImageLayout image={mainImage} imageAlt={'Изображение'} height={300} isIndents={true}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography fontSize={'xxx-large'} color={'whitesmoke'}>{categoryData?.currentData?.item?.name}</Typography>
        </Box>
      </FullsizeImageLayout>
      <Box display={'flex'} justifyContent={'center'} width={'100%'}>
        <Box maxWidth={'1200px'}>
          {categoryData.isLoading && <Skeleton/>}
          {!categoryData.isLoading && categoryData?.currentData?.item?.products?.length === 0 && //Исправить зависимость от наличия продуктов в категории
            <CatalogSubTabs list={categoryData?.currentData?.item?.childrens}/>
          }
          {(!categoryData.isLoading || categoryData?.currentData?.item?.childrens?.length === 0) && products?.list && products?.list?.length > 0 &&
            <CatalogProducts list={products?.list}/>
          }
        </Box>
      </Box>
    </Box>
  );
};

export {Catalog};