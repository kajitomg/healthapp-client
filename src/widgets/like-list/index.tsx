import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useCallback} from "react";
import {List} from "../../shared/components/list";
import {LikeItem} from "../../features/like-item";
import {LikeNoProducts} from "../../features/like-no-products";

interface LikeListProps {
  
  list?:IProduct[],
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,

}

const LikeList = (props:LikeListProps) => {
  const {setPage,pages,page} = useSetPage()
  const {setParams} = useParams()
  
  const callbacks = {
    
    onProductClick:useCallback((id:number) => {
      setPage('product',id.toString())
      setParams({},pages?.list?.find(page => page.id === 'product'))
    },[setParams,page]),
    
  }
  
  const renders = {
    item:useCallback((item:IProduct) => (
      <LikeItem item={item} key={item?.id} onClick={callbacks.onProductClick} likeProps={props.likeProps} cartProps={props.cartProps}/>
    ),[callbacks.onProductClick,props.likeProps,props.cartProps])
  }
  
  if(props.list?.length !== 0){
    return (
      <Box className={'Like_list'} display={'flex'} flexDirection={'column'} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'} my={1}>
        <List list={props.list} renderItem={renders.item}/>
      </Box>
    );
  }
  return <LikeNoProducts available={true}/>
  
};

export {LikeList};