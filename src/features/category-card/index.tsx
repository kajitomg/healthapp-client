import {useCallback} from "react";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {CardProps} from "@mui/material";
import {StyledCard} from "../../shared/components/styled-card";
import {useCatalog} from "../../entities/catalog/hooks/use-catalog.ts";

type CategoryCardProps = {
  
  catalogId?:string | number
  
} & CardProps

const CategoryCard = (props:CategoryCardProps) => {
  const {catalogId, ...defProps} = props
  
  
  const {loadCatalogCategory,loadCatalogProducts} = useCatalog()
  const {setPage,pages} = usePage()
  const {setParams,params} = useParams({page:pages.list.find(page => page.id === 'catalog')})
  
  const callbacks = {
    
    setCatalog:useCallback((categoryId:number | string) => {
      loadCatalogCategory({
        query:{categoryId}
      })
    },[loadCatalogCategory]),
    
    setProducts:useCallback((categoryId:number | string) => {
      loadCatalogProducts({
        params:params,
        query:{categoryId,paginationPageId:1},
        options:{isLoadWithCategory:Boolean(categoryId)}
      })
  },[loadCatalogProducts,params]),
    
    onClick:useCallback(() => {
      if(catalogId){
        setPage('catalog', catalogId.toString())
        callbacks.setProducts(catalogId)
        callbacks.setCatalog(catalogId)
      }
    },[setPage,setParams,pages,catalogId,params,loadCatalogProducts,loadCatalogCategory])
  }
  return (
    <StyledCard onClick={callbacks.onClick} {...defProps}>{props.children}</StyledCard>
  );
};

export {CategoryCard};