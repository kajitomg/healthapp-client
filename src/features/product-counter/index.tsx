import {getProductCartCount} from "../../shared/utils/get-product-cart-count.ts";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {Counter} from "../../shared/components/counter";
import {useCallback} from "react";

interface ProductCounterProps {
  
  product?:IProduct,
  
  cartProps?:ReturnType<typeof useCart>
  
}

const ProductCounter = (props:ProductCounterProps) => {
  
  const callbacks = {
    
    onIncrement:useCallback(() => {
      props.cartProps?.incrementProductInCart(props?.product)
    },[props?.product]),
    
    onDecrement:useCallback(() => {
      props.cartProps?.decrementProductInCart(props?.product)
    },[props?.product])
  }
  
  return (
    <Counter
      onIncrement={callbacks.onIncrement}
      onDecrement={callbacks.onDecrement}
      count={getProductCartCount(props?.product)}
    />
  );
};

export {ProductCounter};