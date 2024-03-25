import {useLike} from "../../entities/like/hooks/use-like.ts";
import Box from "@mui/material/Box";
import {useEffect} from "react";
import {LikeManagerAmount} from "../../widgets/like-manager-amount";
import {LikeList} from "../../widgets/like-list";
import {Loader} from "../../shared/components/loader";

const PersonalAccountLike = () => {
  const likeProps = useLike()
  
  useEffect(() => {
    likeProps.loadLikeProducts()
  },[likeProps.loadLikeProducts])
  
  
  if(!likeProps.isLikeProductsLoading){
    return (
      <Box>
        {likeProps.likeProducts?.list && likeProps.likeProducts?.list.length > 0 && <LikeManagerAmount list={likeProps.likeProducts?.list}/>}
        <LikeList list={likeProps.likeProducts?.list} likeProps={likeProps}/>
      </Box>
    );
  }
  return <Loader/>
};

export {PersonalAccountLike};