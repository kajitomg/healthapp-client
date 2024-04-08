import {memo, useCallback} from 'react';
import {List} from "../../shared/components/list";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {CatalogProductsCard} from "../../features/catalog-products-card";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {CatalogNoProducts} from "../../features/catalog-no-products";
import {StyledList} from "../../shared/components/styled-list";

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
      <StyledList minItemWidth={'270px'} m={1}>
        <List list={props.list} renderItem={renders.item}/>
      </StyledList>
    );
  }
  return <CatalogNoProducts available={true}/>
});

export {CatalogProductsList};