import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {ProductPrice} from "../product-price";
import {ProductButtonBuy} from "../product-button-buy";
import {ManagerLayout} from "../../shared/components/manager-layout";
import {useCallback} from "react";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";

interface ProductDataProps {

  data?:IProduct
  
}

const ProductData = (props:ProductDataProps) => {
  const {addProductToCart,deleteProductFromCart,isCartAvailable} = useCart()
  
  const callbacks = {
    onCartClick:useCallback( () => {
      props.data && addProductToCart(props.data)
    },[props.data,addProductToCart]),
    
    onCartAvailableClick:useCallback( () => {
      props.data && deleteProductFromCart(props.data)
    },[props.data,deleteProductFromCart]),
    
    isCartAvailable:useCallback(() => {
      return isCartAvailable(props.data)
    },[props.data,isCartAvailable]),
  }
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} height={'100%'}>
      <Box p={1}>
        <Typography fontSize={'x-large'} fontWeight={'bolder'}>{props?.data?.name}</Typography>
      </Box>
      <ManagerLayout>
        <Box display={'flex'} alignItems={'center'}>
          <Box flex={'1 1 100%'} paddingX={2} display={'flex'}>
            <ProductPrice price={props?.data?.price} discount={props?.data?.discount}/>
          </Box>
          <Box flex={'1 0 100px'} display={'flex'} justifyContent={'center'}>
            <ProductButtonBuy
              onClick={callbacks.onCartClick}
              onClickAvailable={callbacks.onCartAvailableClick}
              isAvailable={callbacks.isCartAvailable()}
            />
          </Box>
        </Box>
        <Box>
          <Typography fontSize={'smaller'} fontWeight={'lighter'}>Артикул: {props?.data?.article}</Typography>
          <Typography fontSize={'smaller'} fontWeight={'lighter'}>Осталось: {props?.data?.count }шт.</Typography>
        </Box>
      </ManagerLayout>
    </Box>
  );
};

export {ProductData};