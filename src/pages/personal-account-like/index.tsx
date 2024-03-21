import {useLike} from "../../entities/like/hooks/use-like.ts";
import {Box} from "@mui/material";
import {useEffect} from "react";
import {LikeManagerAmount} from "../../widgets/like-manager-amount";
import {LikeList} from "../../widgets/like-list";

const PersonalAccountLike = () => {
  const likeProps = useLike()
  
  useEffect(() => {
    likeProps.loadLikeProducts()
  },[likeProps.loadLikeProducts])
  
  
  return (
    <Box>
      {likeProps.likeProducts?.list && likeProps.likeProducts?.list.length > 0 && <LikeManagerAmount list={likeProps.likeProducts?.list}/>}
      <LikeList list={likeProps.likeProducts?.list} likeProps={likeProps}/>
    </Box>
  );
};

export {PersonalAccountLike};