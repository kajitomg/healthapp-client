import {CartManagerOrderContent} from "../../features/cart-manager-order-content";
import {CartManagerOrderActions} from "../../features/cart-manager-order-actions";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {ManagerTitle} from "../../shared/components/manager-title";
import {ManagerStickyLayout} from "../../shared/components/manager-layout-sticky";
import {memo} from "react";
import {useTheme} from "@mui/material";


interface CartManagerOrderProps {
  
  products?:IProduct[],
  
  cartProps?:ReturnType<typeof useCart>,
  
}

const CartManagerOrder = memo((props:CartManagerOrderProps) => {
  const theme = useTheme()
  
  return (
    <ManagerStickyLayout sx={{
      flex:'0 1 300px',
      minWidth:'300px',
      [theme.breakpoints.down('md')]:{
        top:`auto`,
        position:'relative',
        minWidth:'auto',
        flex:'0 1 auto',
        width:`calc(100% - ${theme.spacing(2)})`
      },
      
    }}>
      <ManagerTitle title={'Заказ'}/>
      <CartManagerOrderContent products={props.products}/>
      <CartManagerOrderActions/>
    </ManagerStickyLayout>
  );
});

export {CartManagerOrder};