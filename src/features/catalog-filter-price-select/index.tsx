import {Box, TextField, Typography} from "@mui/material";
import {ChangeEvent, useCallback} from "react";

interface CatalogFilterPriceSelectProps {
  
  value:number[],
  
  onChange:(newValue: number[]) => void
  
}
const CatalogFilterPriceSelect = (props:CatalogFilterPriceSelectProps) => {
  
  const callbacks = {
    onChange:useCallback((index:number) => (event: ChangeEvent<HTMLInputElement>) => {
      const data = JSON.parse(JSON.stringify(props.value))
      
      data[index] = +event.currentTarget.value
      
      props.onChange(data)
    },[props.value])
  }
  
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography
        fontSize={'small'}
        sx={{
          mr:'8px'
        }}>От</Typography>
      <TextField
        size={'small'}
        placeholder={'От'}
        id={'catalog-filter-price-select'}
        type={'number'}
        value={props.value[0]}
        onChange={callbacks.onChange(0)}
        margin={'none'}
        sx={{
          mr:'8px'
        }}
      />
      <Typography
        fontSize={'small'}
        sx={{
          mx:'8px'
        }}>До</Typography>
      <TextField
        size={'small'}
        placeholder={'До'}
        id={'catalog-filter-price-select'}
        type={'number'}
        margin={'none'}
        value={props.value[1]}
        onChange={callbacks.onChange(1)}
      />
    </Box>
  );
};

export {CatalogFilterPriceSelect};