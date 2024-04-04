import Box from "@mui/material/Box";
import {MainContentLayout} from "../../shared/components/main-content-layout";
import mainImage from "../../imgaes/main.jpg";
import {CartProducts} from "../../widgets/cart-products";
import {PageImageLayout} from "../../shared/components/page-image-layout";
import mainImageSM from "../../imgaes/main_SM.jpg";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";


const Cart = () => {
  const {page} = usePage()
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <PageImageLayout
        image={mainImage}
        progressiveImage={mainImageSM}
        imageAlt={'Изображение'}
        title={page?.name}
      />
      <MainContentLayout sx={{pt:2}}>
        <CartProducts/>
      </MainContentLayout>
    </Box>
  );
};

export default Cart;