import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useCallback, useState} from "react";
import {ICategory} from "../../entities/product/model/category-model.ts";

interface ProductsFilterProps {
  
  list?:ICategory[]
  
}
/*
  Фильтрация по (категория,цена,наличие)..., выбор нескольких категорий
 */
const ProductsFilter = (props:ProductsFilterProps) => {
  const [category, setCategory] = useState(props.list?.[0]?.id?.toString());
  
  const callbacks = {
    onChange:useCallback((event: SelectChangeEvent) => {
      setCategory(event.target?.value as string);
    },[])
  }
  
  return (
    <Box width={'100%'} marginTop={2}>
      <FormControl fullWidth>
        <InputLabel id="products-filter-label">Категория</InputLabel>
        <Select
          labelId="products-filter-label"
          id="products-filter-select"
          value={category || ''}
          label="Категория"
          onChange={callbacks.onChange}
        >
          {props.list?.map(item =>
            <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export {ProductsFilter};