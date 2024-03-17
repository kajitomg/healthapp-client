import {useTheme} from "@mui/material";
import {CartManagerTitle} from "../../features/cart-manager-title";
import {CartManagerContent} from "../../features/cart-manager-content";
import {CartManagerActions} from "../../features/cart-manager-actions";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {StickyLayout} from "../../shared/components/sticky-layout";


interface CartManagerProps {
  
  products?:IProduct[],
  
  cartProps?:ReturnType<typeof useCart>,
  
}

const CartManager = (props:CartManagerProps) => {
  
  return (
    <StickyLayout sx={{
      flex:'0 1 300px',
      minWidth:'300px',
      margin:1,
      padding:1,
    }}>
      <CartManagerTitle title={'Заказ'}/>
      <CartManagerContent products={props.products}/>
      <CartManagerActions products={props.products} cartProps={props.cartProps}/>
    </StickyLayout>
  );
};

export {CartManager};