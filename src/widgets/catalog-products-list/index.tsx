import {useCallback} from 'react';
import {List} from "../../shared/components/list";
import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {CatalogProductsCard} from "../../features/catalog-products-card";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";

interface CatalogProductsListProps {
  list?:IProduct[]
}

const CatalogProductsList = (props:CatalogProductsListProps) => {
  const cartProps = useCart()
  const likeProps = useLike()
  
  
  const renders = {
    item: useCallback((item:IProduct) => (
      <CatalogProductsCard key={item.id} item={item} cartProps={cartProps} likeProps={likeProps}/>
    ), [cartProps,likeProps]),
  };
  
  return (
    <Box display={'flex'} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
      <List list={props.list} renderItem={renders.item}/>
    </Box>
  );
};

export {CatalogProductsList};