import {Box} from "@mui/material";
import {ProductPrice} from "../product-price";
import {useCallback} from "react";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductButtonLike} from "../product-button-like";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {ProductButtonBuy} from "../product-button-buy";

interface CatalogProductsCardActionsProps {
  
  price?:number,
  
  discount?:number,
  
  product?:IProduct,
  
  cartProps?:ReturnType<typeof useCart>,
  
  likeProps?:ReturnType<typeof useLike>,
  
}

const CatalogProductsCardActions = (props:CatalogProductsCardActionsProps) => {
  const {product,likeProps,cartProps,discount,price} = props
  
  const callbacks = {
    onCartClick:useCallback( () => {
      product && cartProps?.addProductToCart(product)
    },[product,cartProps]),
    
    onCartAvailableClick:useCallback( () => {
      product && cartProps?.deleteProductFromCart(product)
    },[product,cartProps]),
    
    isCartAvailable:useCallback(() => {
      return cartProps?.isCartAvailable(product)
    },[product,cartProps]),
    
    onLikeClick:useCallback( () => {
      product && likeProps?.addProductToLike(product)
    },[product,likeProps]),
    
    onLikeAvailableClick:useCallback( () => {
      product && likeProps?.deleteProductFromLike(product)
    },[product,likeProps]),
    
    isLikeAvailable:useCallback(() => {
      return likeProps?.isLikeAvailable(product)
    },[product,likeProps]),
  }
  
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} minHeight={'46px'} paddingX={1}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} minWidth={'132px'}>
        <Box display={'flex'} flex={'1 1 100%'} justifyContent={'center'}>
          <ProductButtonBuy
            onClick={callbacks.onCartClick}
            onClickAvailable={callbacks.onCartAvailableClick}
            isAvailable={callbacks.isCartAvailable()}
          />
        </Box>
        <ProductButtonLike
          onClick={callbacks.onLikeClick}
          onClickAvailable={callbacks.onLikeAvailableClick}
          isAvailable={callbacks.isLikeAvailable()}
        />
      </Box>
      <ProductPrice price={price} discount={discount}/>
    </Box>
  );
};

export {CatalogProductsCardActions};