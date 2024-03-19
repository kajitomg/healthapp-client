import {Box, Typography} from "@mui/material";
import mainImage  from '../../imgaes/main.jpg';
import {FullsizeImageLayout} from "../../shared/components/fullsize-image-layout";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {CatalogProducts} from "../../widgets/catalog-products";
import {CatalogSubTabs} from "../../widgets/catalog-sub-tabs";
import {useEffect} from "react";
import {useParams as useReactParams} from "react-router-dom";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {useCategory} from "../../entities/product/hooks/use-category.ts";
import {useProduct} from "../../entities/product/hooks/use-product.ts";


const Catalog = () => {
  const {page} = useSetPage()
  const {params} = useParams()
  const {id} = useReactParams()
  
  const {category,categoryIsLoading,loadCategory} = useCategory()
  const {products,productsIsLoading,loadProducts} = useProduct()
  
  
  useEffect(() => {
    loadProducts({
      params:{
        ...(params?.filter && {filter: JSON.stringify(params?.filter)}),
        ...(category?.item.id && page?.id === 'catalog' && {'where[category][id]': category?.item.id}),
        ...(params?.sort && {sort: JSON.stringify(params?.sort)})
      },
      options:{
        includeDefaultParams:true
      }
    })
  },[params,category,loadProducts,page?.id])
  
  useEffect(() => {
    if(id) {
      loadCategory({
        data: {
          id:+id
        },
        params: {
          'include[category]': 'childrens',
        },
        options: {
          includeDefaultParams: true
        }
      })
    }
  },[id,loadCategory])
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <FullsizeImageLayout image={mainImage} imageAlt={'Изображение'} height={200} isIndents={true}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography fontSize={'xxx-large'} color={'whitesmoke'}>{id && category?.item?.name || page?.name}</Typography>
        </Box>
      </FullsizeImageLayout>
      <MainContentLayout>
        {!categoryIsLoading && !productsIsLoading  && products?.list?.length === 0 &&
          <CatalogSubTabs list={category?.item?.childrens} />
        }
        {!categoryIsLoading && !productsIsLoading && products?.list && products?.list?.length > 0 &&
          <CatalogProducts list={products?.list}/>
        }
      </MainContentLayout>
    </Box>
  );
};

export default Catalog;