import {Box, TextField} from "@mui/material";
import {ChangeEvent, useCallback} from "react";

interface CatalogFilterPriceSelectProps {
  
  value:number[],
  
  onChange:(newValue: number[]) => void,
  
  minPlaceholder?:number | null,
  
  maxPlaceholder?:number | null,
  
}
const CatalogFilterPriceSelect = (props:CatalogFilterPriceSelectProps) => {
  
  const callbacks = {
    onChange:useCallback((index:number) => (event: ChangeEvent<HTMLInputElement>) => {
      const data = JSON.parse(JSON.stringify(props.value))

      data[index] = +event.currentTarget.value
      
      props.onChange(data)
    },[props.value,props.onChange])
  }
  
  return (
    <Box display={'flex'} alignItems={'center'} marginY={2}>
      <TextField
        size={'small'}
        placeholder={`от ${props?.minPlaceholder}`}
        id={'catalog-filter-price-select'}
        type={'number'}
        value={props?.value?.[0] || ''}
        InputProps={{
          sx:{
            fontSize:12
          }
        }}
        onChange={callbacks.onChange(0)}
        margin={'none'}
        sx={{
          mr:'8px'
        }}
      />
      <TextField
        size={'small'}
        placeholder={`до ${props?.maxPlaceholder}`}
        id={'catalog-filter-price-select'}
        type={'number'}
        margin={'none'}
        value={props?.value?.[1] || ''}
        InputProps={{
          sx:{
            fontSize:12
          }
        }}
        onChange={callbacks.onChange(1)}
      />
    </Box>
  );
};

export {CatalogFilterPriceSelect};