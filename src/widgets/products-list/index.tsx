import {useCallback} from 'react';
import {List} from "../../shared/components/list";
import {Box} from "@mui/material";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useLoadProductsQuery} from "../../entities/product/store/products/api.ts";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductCard} from "../../features/product-card";

const ProductsList = () => {
  
  const products = useTypedSelector(state => state.products)
  
  useLoadProductsQuery({})
  
  const renders = {
    item: useCallback((item:IProduct) => (
      <ProductCard item={item} key={item.id}/>
    ), []),
  };
  
  return (
    <Box display={'flex'} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
      <List list={products.list} renderItem={renders.item}/>
    </Box>
  );
};

export {ProductsList};