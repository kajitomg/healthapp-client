import Box from "@mui/material/Box";
import mainImage  from '../../imgaes/main.jpg';
import mainImageSM  from '../../imgaes/main_SM.jpg';
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
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
import {useCatalog} from "../../entities/catalog/hooks/use-catalog.ts";
import {ParamsType} from "../../shared/models";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";


const Catalog = () => { //UPD Найти способ декомпозировать функционал компонентов по страницам
  const {id} = useReactParams()
  
  const {page} = usePage()
  const {params} = useParams({page})
  
  const {loadCatalogProducts,loadCatalogCategory} = useCatalog()
  
  const catalog = useTypedSelector((state) => state.catalog)
  
  const callbacks = {
    loadProducts:useCallback((pageId?:number,params?:ParamsType | null) => {
      loadCatalogProducts({
        params:params,
        query:{categoryId:id,paginationPageId:pageId},
        options:{isLoadWithCategory:Boolean(id)}
      })
    },[id,loadCatalogProducts]),
  }
  
  useEffect(() => {
    if(id !== catalog.category.item?.id && !catalog.category.waiting){
      loadCatalogCategory({
        query:{categoryId:id}
      })
    }
  },[id,loadCatalogCategory])
  
  useEffect(() => {
    if(page?.id){
      callbacks.loadProducts(1,params)
    }
  },[callbacks.loadProducts,params])

  const {available,setTab,list} = useTabs({
    name:'catalog',
    tabs:[
      {id:'categories',label:'Категории',component:<CatalogCategories/>},
      {id:'products',label:'Продукты',component:<CatalogProducts onPageChange={callbacks.loadProducts}/>},
      {id:'loader',label:'Загрузка',component:<Loader/>}
    ],
    availableId:'loader'
  },[callbacks.loadProducts])

  useEffect(() => {
    if(!catalog.products.waiting && !catalog.category.waiting){
      if(catalog.products?.count || (catalog.products?.count !== undefined && !catalog.category?.item?.childrens.length)){
        setTab(undefined, 1)
      } else if(catalog.products?.count !== undefined && catalog.category?.item?.childrens.length){
        setTab(undefined, 0)
      }
    }
  },[catalog,id])

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