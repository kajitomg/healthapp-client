import {Box, Button} from "@mui/material";
import {CatalogFilterPriceSlider} from "../catalog-filter-price-slider";
import {CatalogFilterPriceSelect} from "../catalog-filter-price-select";
import {useCallback, useEffect, useState} from "react";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {ParamsType} from "../../shared/models";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {getPriceValues} from "../../shared/utils/getPriceValues.ts";

interface CatalogFilterPriceProps {
  
  list:IProduct[]
  
}


const CatalogFilterPrice = (props:CatalogFilterPriceProps) => {
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
      <CatalogFilterPriceSelect value={value} onChange={callbacks.onChange} minPlaceholder={prices.min} maxPlaceholder={prices.max}/>
      <CatalogFilterPriceSlider value={value} max={prices.max} onChange={callbacks.onChange}/>
      <Button variant={'contained'} onClick={callbacks.onApply}>Применить</Button>
    </Box>
  );
};

export {CatalogFilterPrice};