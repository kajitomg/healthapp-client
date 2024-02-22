import {Box, Button} from "@mui/material";
import {CatalogFilterPriceSlider} from "../catalog-filter-price-slider";
import {CatalogFilterPriceSelect} from "../catalog-filter-price-select";
import {useCallback, useState} from "react";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useSetParams} from "../../entities/params-controller/hooks/use-set-params.ts";



const CatalogFilterPrice = () => {
  const {page} = useSetPage()
  const {setParams} = useSetParams({page})
  const [value, setValue] = useState<number[]>([800, 9999]);
  
  const callbacks = {
    onChange:useCallback((newValue: number | number[]) => {
      setValue(newValue as number[]);
    },[setParams]),
    
    onApply: useCallback(() => {
      setParams({'filter[price]':JSON.stringify(value)})
    },[value])
  }
  
  return (
    <Box width={'100%'} display={'flex'} flexDirection={'column'}>
      <CatalogFilterPriceSelect value={value} onChange={callbacks.onChange}/>
      <CatalogFilterPriceSlider value={value} max={9999} onChange={callbacks.onChange}/>
      <Button variant={'contained'} onClick={callbacks.onApply}>Применить</Button>
    </Box>
  );
};

export {CatalogFilterPrice};