import {MainContentLayout} from "../../shared/components/main-content-layout";
import {Box} from "@mui/material";
import {useEffect} from "react";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import mainImage from "../../imgaes/main.jpg";
import mainImageSM  from '../../imgaes/main_SM.jpg'
import {LikeProducts} from "../../widgets/like-products";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {PageImageLayout} from "../../shared/components/page-image-layout";

const Like = () => {
  const {page} = useSetPage()
  
  const cartProps = useCart()
  const likeProps = useLike()
  
  useEffect(() => {
    likeProps.loadLikeProducts()
  },[likeProps.loadLikeProducts])
  
  return (
    <Box>
      <PageImageLayout
        image={mainImage}
        progressiveImage={mainImageSM}
        imageAlt={'Изображение'}
        title={page?.name}
      />
      <MainContentLayout>
        <LikeProducts products={likeProps.likeProducts?.list} cartProps={cartProps} likeProps={likeProps}/>
      </MainContentLayout>
    </Box>
  );
};

export default Like;