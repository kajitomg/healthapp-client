import {useCallback} from 'react';
import {List} from "../../shared/components/list";
import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductCard} from "../../features/product-card";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";

interface ProductsListProps {
  list?:IProduct[]
}

const ProductsList = (props:ProductsListProps) => {
  const {setPage,pages} = useSetPage()
  const {setParams} = useParams()
  const cartProps = useCart()
  const likeProps = useLike()
  
  const callbacks = {
    
    onProductClick:useCallback((id:number) => {
      setPage('product',id.toString())
      setParams({},pages?.list?.find(page => page.id === 'product'))
    },[setParams,setPage,pages]),
    
  }
  
  const renders = {
    item: useCallback((item:IProduct) => (
      <ProductCard item={item} key={item.id} onClick={callbacks.onProductClick} cartProps={cartProps} likeProps={likeProps}/>
    ), [callbacks.onProductClick,cartProps,likeProps]),
  };
  
  return (
    <Box className={'Products_list'} display={'flex'} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
      <List list={props.list} renderItem={renders.item}/>
    </Box>
  );
};

export {ProductsList};