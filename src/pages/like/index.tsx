import {MainContentLayout} from "../../shared/components/main-content-layout";
import {Box, Typography} from "@mui/material";
import {useEffect} from "react";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useLike} from "../../entities/like/hooks/use-like.ts";
import {FullsizeImageLayout} from "../../shared/components/fullsize-image-layout";
import mainImage from "../../imgaes/main.jpg";
import {LikeProducts} from "../../widgets/like-products";
import {useCart} from "../../entities/cart/hooks/use-cart.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";

const Like = () => {
  const {page} = useSetPage()
  const session = useTypedSelector(state => state.session)
  
  const cartProps = useCart()
  const likeProps = useLike()
  
  useEffect(() => {
    if(session.user.id){
      likeProps.loadLike(session.user.id)
    }
  },[session.user.id])
  
  useEffect(() => {
    likeProps.loadLikeProducts()
  },[likeProps.loadLikeProducts])
  
  return (
    <Box>
      <FullsizeImageLayout image={mainImage} imageAlt={'Изображение'} height={200} isIndents={true}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography fontSize={'xxx-large'} color={'whitesmoke'}>{page?.name || 'Избранное'}</Typography>
        </Box>
      </FullsizeImageLayout>
      <MainContentLayout>
        <LikeProducts products={likeProps.likeProducts?.list} cartProps={cartProps} likeProps={likeProps}/>
      </MainContentLayout>
    </Box>
  );
};

export {Like};