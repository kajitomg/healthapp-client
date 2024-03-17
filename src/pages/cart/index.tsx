import {Box, Typography} from "@mui/material";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import {FullsizeImageLayout} from "../../shared/components/fullsize-image-layout";
import mainImage from "../../imgaes/main.jpg";
import {CartNoProducts} from "../../features/cart-no-products";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useEffect} from "react";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {CartProducts} from "../../widgets/cart-products";
import {useLike} from "../../entities/like/hooks/use-like.ts";


const Cart = () => {
  const session = useTypedSelector(state => state.session)
  
  const cartProps = useCart()
  const likeProps = useLike()
  

  useEffect(() => {
    if(session.exists){
      cartProps.loadCart(session.user.id)
    }
  },[session, cartProps.loadCart])
  
  useEffect(() => {
    cartProps.loadCartProducts()
  },[cartProps.loadCartProducts])
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <FullsizeImageLayout image={mainImage} imageAlt={'Изображение'} height={200} isIndents={true}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography fontSize={'xxx-large'} color={'whitesmoke'}>Корзина</Typography>
        </Box>
      </FullsizeImageLayout>
      <MainContentLayout>
        <CartNoProducts available={!(cartProps.cartProducts?.list?.length !== 0)}/>
        <CartProducts products={cartProps.cartProducts?.list} available={cartProps.cartProducts?.list?.length > 0} cartProps={cartProps} likeProps={likeProps}/>
      </MainContentLayout>
    </Box>
  );
};

export {Cart};