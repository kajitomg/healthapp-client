import {memo, useCallback} from 'react';
import {List} from "../../shared/components/list";
import Box from "@mui/material/Box";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {CatalogProductsCard} from "../../features/catalog-products-card";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {CatalogNoProducts} from "../../features/catalog-no-products";

interface CatalogProductsListProps {
  
  list?:IProduct[],
  
  count?:number
}

const CatalogProductsList = memo((props:CatalogProductsListProps) => {
  const cartProps = useCart()
  const likeProps = useLike()
  
  const renders = {
    item: useCallback((item:IProduct) => (
      <CatalogProductsCard key={item.id} item={item} cartProps={cartProps} likeProps={likeProps}/>
    ), [cartProps,likeProps]),
  };
  
  if(props.list?.length){
    return (
      <Box display={'flex'} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
        <List list={props.list} renderItem={renders.item}/>
      </Box>
    );
  }
  return <CatalogNoProducts available={true}/>
});

export {CatalogProductsList};