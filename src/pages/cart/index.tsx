import Box from "@mui/material/Box";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import mainImage from "../../imgaes/main.jpg";
import {useEffect} from "react";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {CartProducts} from "../../widgets/cart-products";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {PageImageLayout} from "../../shared/components/page-image-layout";
import mainImageSM from "../../imgaes/main_SM.jpg";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";


const Cart = () => {
  const {page} = useSetPage()
  
  const cartProps = useCart()
  const likeProps = useLike()
  
  useEffect(() => {
    cartProps.loadCartProducts()
  },[cartProps.loadCartProducts])
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <PageImageLayout
        image={mainImage}
        progressiveImage={mainImageSM}
        imageAlt={'Изображение'}
        title={page?.name}
      />
      <MainContentLayout>
        <CartProducts products={cartProps.cartProducts?.list} available={cartProps.cartProducts?.list?.length !== 0} cartProps={cartProps} likeProps={likeProps}/>
      </MainContentLayout>
    </Box>
  );
};

export default Cart;