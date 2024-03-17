import {Box, Typography} from "@mui/material";
import mainImage  from '../../imgaes/main.jpg';
import {FullsizeImageLayout} from "../../shared/components/fullsize-image-layout";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useLoadProductsQuery} from "../../entities/product/store/products/api.ts";
import {CatalogProducts} from "../../widgets/catalog-products";
import {CatalogSubTabs} from "../../widgets/catalog-sub-tabs";
import {useLazyLoadCategoryQuery} from "../../entities/product/store/categories/api.ts";
import {useEffect} from "react";
import {useParams as useReactParams} from "react-router-dom";
import {MainContentLayout} from "../../shared/components/main-content-layout";


const Catalog = () => {
  const {page} = useSetPage()
  const {params} = useParams({page})
  const {id} = useReactParams()
  const [loadCategory,categoryData] = useLazyLoadCategoryQuery()

  const {data:products,isLoading, refetch} = useLoadProductsQuery({
    params: {
      ...(params?.filter && {filter: JSON.stringify(params?.filter)}),
      'include[category]': '',
      ...(categoryData?.currentData?.item?.id && page?.id === 'catalog' && {'where[category][id]': categoryData?.currentData?.item?.id}),
      'include[image]': '',
      'include[document]': '',
      'include[specification]': '',
      ...(params?.sort && {sort: JSON.stringify(params?.sort)})
    }})

  useEffect(() => {
    if(id){
      loadCategory({
        id:id,
        params:{
          'include[category]':'childrens',
          'include[level]':'',
        }
      })
    }
  },[id])
  useEffect(() => {
    refetch()
  },[params])
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <FullsizeImageLayout image={mainImage} imageAlt={'Изображение'} height={200} isIndents={true}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography fontSize={'xxx-large'} color={'whitesmoke'}>{id && categoryData?.currentData?.item?.name || page?.name}</Typography>
        </Box>
      </FullsizeImageLayout>
      <MainContentLayout>
        {!categoryData.isLoading && !isLoading  && products?.list?.length === 0 &&
          <CatalogSubTabs list={categoryData?.currentData?.item?.childrens} />
        }
        {!categoryData.isLoading && !isLoading && products?.list && products?.list?.length > 0 &&
          <CatalogProducts list={products?.list}/>
        }
      </MainContentLayout>
    </Box>
  );
};

export {Catalog};