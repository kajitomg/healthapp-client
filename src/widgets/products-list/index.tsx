import {useCallback} from 'react';
import {List} from "../../shared/components/list";
import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductCard} from "../../features/product-card";

interface ProductsListProps {
  list?:IProduct[]
}

const ProductsList = (props:ProductsListProps) => {
  
  const renders = {
    item: useCallback((item:IProduct) => (
      <ProductCard item={item} key={item.id}/>
    ), []),
  };
  
  return (
    <Box className={'da'} display={'flex'} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
      <List list={props.list} renderItem={renders.item}/>
    </Box>
  );
};

export {ProductsList};