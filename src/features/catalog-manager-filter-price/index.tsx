import Box from "@mui/material/Box";
import {CatalogManagerFilterPriceSlider} from "../catalog-manager-filter-price-slider";
import {CatalogManagerFilterPriceSelect} from "../catalog-manager-filter-price-select";
import {useCallback, useEffect, useState} from "react";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {ParamsType} from "../../shared/models";
import {CatalogManagerFilterButton} from "../catalog-manager-filter-button";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useCatalog} from "../../entities/catalog/hooks/use-catalog.ts";
import {useParams as useReactParams} from "react-router-dom";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";


const CatalogManagerFilterPrice = () => {
  const {id} = useReactParams()
  const catalog = useTypedSelector(state => state.catalog)
  const {page} = usePage()
  const {setParams,params} = useParams({page})
  const [value, setValue] = useState<number[]>((params?.filter as ParamsType)?.price as number[] || [0,0]);
  
  const {loadCatalogProductsRange} = useCatalog()
  
  const callbacks = {
    onChange:useCallback((newValue: number | number[]) => {
      setValue(newValue as number[]);
    },[]),
    
    onApply: useCallback(() => {
      setParams({filter:{price:value}})
    },[value,setParams]),
    
    loadProductsRange:useCallback(() => {
      loadCatalogProductsRange({
        query:{categoryId:id},
        params:params,
        options:{isLoadWithCategory:Boolean(page?.id)}
      })
    },[id,params])
    
  }
  
  useEffect(() => {
    callbacks.loadProductsRange()
  },[page?.id,catalog.products.list, callbacks.loadProductsRange])
  
  useEffect(() => {
    
    setValue((params?.filter as ParamsType)?.price as number[] || [0,0])
    
  },[params?.filter])

  return (
    <Box width={'100%'} display={'flex'} flexDirection={'column'}>
      <CatalogManagerFilterPriceSelect value={value} onChange={callbacks.onChange} minPlaceholder={catalog.products.pricesRange?.min} maxPlaceholder={catalog.products.pricesRange?.max}/>
      <CatalogManagerFilterPriceSlider value={value} max={catalog.products.pricesRange?.max} onChange={callbacks.onChange}/>
      <CatalogManagerFilterButton onClick={callbacks.onApply} buttonText={'Применить'}/>
    </Box>
  );
};

export {CatalogManagerFilterPrice};