import {Box} from "@mui/material";
import mainImage  from '../../imgaes/main.jpg';
import mainImageSM  from '../../imgaes/main_SM.jpg';
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {CatalogProducts} from "../../widgets/catalog-products";
import {CatalogCategories} from "../../widgets/catalog-categories";
import {useEffect} from "react";
import {useParams as useReactParams} from "react-router-dom";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {useCategory} from "../../entities/product/hooks/use-category.ts";
import {useProducts} from "../../entities/product/hooks/use-products.ts";
import {PageImageLayout} from "../../shared/components/page-image-layout";


const Catalog = () => {
  const {page} = useSetPage()
  const {params} = useParams()
  const {id} = useReactParams()
  
  const {category,categoryIsLoading,loadCategory} = useCategory()
  const {products,productsIsLoading,loadProducts} = useProducts()
  
  
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
    loadCategory({
      data: {
        id:id
      },
      params: {
        'include[category]': 'childrens',
      },
      options: {
        includeDefaultParams: true
      }
    })
  },[id,loadCategory])
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <PageImageLayout
        image={mainImage}
        progressiveImage={mainImageSM}
        imageAlt={'Изображение'}
        title={id && category?.item?.name || page?.name}
      />
      <MainContentLayout>
        {!categoryIsLoading && !productsIsLoading  && products?.list?.length === 0 &&
          <CatalogCategories list={category?.item?.childrens} />
        }
        {!categoryIsLoading && !productsIsLoading && products?.list && products?.list?.length > 0 &&
          <CatalogProducts list={products?.list}/>
        }
      </MainContentLayout>
    </Box>
  );
};

export default Catalog;