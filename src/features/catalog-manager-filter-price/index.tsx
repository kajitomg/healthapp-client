import Box from "@mui/material/Box";
import {CatalogManagerFilterPriceSlider} from "../catalog-manager-filter-price-slider";
import {CatalogManagerFilterPriceSelect} from "../catalog-manager-filter-price-select";
import {useCallback, useEffect, useState} from "react";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {ParamsType} from "../../shared/models";
import {CatalogManagerFilterButton} from "../catalog-manager-filter-button";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useLazyLoadPricesRangeQuery} from "../../entities/catalog/store/catalog/api.ts";
import {useParams as useReactParams} from "react-router-dom";





const CatalogManagerFilterPrice = () => {
  const {id} = useReactParams()
  const catalog = useTypedSelector(state => state.catalog)
  const [loadRange] = useLazyLoadPricesRangeQuery()
  const [prices, setPrices] = useState<{ min:number,max:number }>({min:0,max:0})
  const {page} = useSetPage()
  const {setParams,params} = useParams({page})
  const [value, setValue] = useState<number[]>((params?.filter as ParamsType)?.price as number[] || [0,0]);

  const callbacks = {
    onChange:useCallback((newValue: number | number[]) => {
      setValue(newValue as number[]);
    },[]),
    
    onApply: useCallback(() => {
      setParams({filter:{price:value}})
    },[value,setParams]),
    
  }
  
  useEffect(() => {
    loadRange({
      params: {
        'include[category]': '',
        ...(params?.filter && {filter: JSON.stringify(params?.filter)}),
        ...(page?.id === 'catalog' && id && {'where[category][id]': id}),
      },
    })
  },[page?.id,params?.filter,id])
  
  useEffect(() => {
    if(catalog.pricesRange){
      setPrices(catalog.pricesRange)
    }
  },[catalog.pricesRange])
  
  useEffect(() => {
    
    setValue((params?.filter as ParamsType)?.price as number[] || [0,0])
    
  },[params?.filter])

  return (
    <Box width={'100%'} display={'flex'} flexDirection={'column'}>
      <CatalogManagerFilterPriceSelect value={value} onChange={callbacks.onChange} minPlaceholder={prices.min} maxPlaceholder={prices.max}/>
      <CatalogManagerFilterPriceSlider value={value} max={prices.max} onChange={callbacks.onChange}/>
      <CatalogManagerFilterButton onClick={callbacks.onApply} buttonText={'Применить'}/>
    </Box>
  );
};

export {CatalogManagerFilterPrice};