import Box from "@mui/material/Box";
import {CatalogManagerFilterPriceSlider} from "../catalog-manager-filter-price-slider";
import {CatalogManagerFilterPriceSelect} from "../catalog-manager-filter-price-select";
import {useCallback, useEffect, useState} from "react";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {ParamsType} from "../../shared/models";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {getPriceValues} from "../../shared/utils/get-price-values.ts";
import {CatalogManagerFilterButton} from "../catalog-manager-filter-button";

interface CatalogManagerFilterPriceProps {
  
  list:IProduct[]
  
}


const CatalogManagerFilterPrice = (props:CatalogManagerFilterPriceProps) => {
  const [prices, setPrices] = useState<{ min:number,max:number }>(getPriceValues(props.list))
  const {page} = useSetPage()
  const {setParams,params} = useParams({page})
  const [value, setValue] = useState<number[]>((params?.filter as ParamsType)?.price as number[] || [0,0]);

  const callbacks = {
    onChange:useCallback((newValue: number | number[]) => {
      setValue(newValue as number[]);
    },[]),
    
    onApply: useCallback(() => {
      setParams({filter:{price:value}})
    },[value,setParams])
  }
  
  useEffect(() => {
    
    setPrices(getPriceValues(props.list))
    
  },[props.list])
  
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