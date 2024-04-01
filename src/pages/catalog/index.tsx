import Box from "@mui/material/Box";
import mainImage  from '../../imgaes/main.jpg';
import mainImageSM  from '../../imgaes/main_SM.jpg';
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useCallback, useEffect} from "react";
import {useParams as useReactParams} from "react-router-dom";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {PageImageLayout} from "../../shared/components/page-image-layout";
import {useTabs} from "../../entities/tabs-controller/hooks/use-tabs.ts";
import {CatalogCategories} from "../catalog-categories";
import {CatalogProducts} from "../catalog-products";
import {TabPanel} from "../../entities/tabs-controller/components/tab-panel";
import {Loader} from "../../shared/components/loader";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {
  useLazyLoadCatalogCategoryQuery,
  useLazyLoadCatalogProductsQuery
} from "../../entities/catalog/store/catalog/api.ts";


const Catalog = () => { //UPD Найти способ декомпозировать функционал компонентов по страницам
  const {page} = useSetPage()
  
  const {params} = useParams({page})
  const {id} = useReactParams()
  
  const catalog = useTypedSelector((state) => state.catalog)
  
  const [loadProducts] = useLazyLoadCatalogProductsQuery()
  const [loadCategory] = useLazyLoadCatalogCategoryQuery()
  
  const callbacks = {
    onProductPageChange:useCallback((pageId?:number) => {
      if(page?.id){
        loadProducts({
          params: {
            'include[category]': '',
            'include[image]': '',
            'include[document]': '',
            'include[specification]': '',
            ...(params?.filter && {filter: JSON.stringify(params?.filter)}),
            ...(page?.id === 'catalog' && id && {'where[category][id]': id}),
            ...(params?.sort && {sort: JSON.stringify(params?.sort)}),
            ...(params?.search && {search: JSON.stringify(params?.search)}),
            ...(pageId && {page: pageId}),
            limit:10
          },
        })
      }
    },[page?.id,params?.filter,params?.sort,params?.search,id])
  }
  
  
  useEffect(() => {
    if(id){
      loadCategory({
        query:{
          id:+id
        },
        params: {
          'include[level]':'',
          'include[category]': 'childrens',
        },
      })
    }
  },[id,loadCategory])
  
  useEffect(() => {
    if(page?.id){
      callbacks.onProductPageChange(1)
    }
  },[callbacks.onProductPageChange])
  
  const {available,setTab,list} = useTabs({
    name:'catalog',
    tabs:[
      {id:'categories',label:'Категории',component:<CatalogCategories/>},
      {id:'products',label:'Продукты',component:<CatalogProducts onPageChange={callbacks.onProductPageChange}/>},
      {id:'loader',label:'Загрузка',component:<Loader/>}
    ],
    availableId:'loader'
  },[])
  
  useEffect(() => {
    if(!catalog.waiting){
      if(catalog.products?.count || catalog.products?.count !== undefined && !catalog.category?.item?.childrens.length){
        setTab(undefined, 1)
      } else if(catalog.products?.count !== undefined && catalog.category?.item?.childrens.length){
        setTab(undefined, 0)
      }
    }
  },[catalog])

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <PageImageLayout
        image={mainImage}
        progressiveImage={mainImageSM}
        imageAlt={'Изображение'}
        title={id && catalog.category?.item?.name || page?.name}
      />
      <MainContentLayout>
        <TabPanel list={list} available={available}/>
      </MainContentLayout>
    </Box>
  );
};

export default Catalog;