import Box from "@mui/material/Box";
import {LikeManagerAmount} from "../../widgets/like-manager-amount";
import {LikeList} from "../../widgets/like-list";
import {Loader} from "../../shared/components/loader";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";

const PersonalAccountLike = () => {
  const like = useTypedSelector(state => state.like)

  if(like.products?.list || (like.products?.list === undefined && !like.products?.waiting && !like.waiting)){
    return (
      <Box>
        {like.products?.list && like.products?.list.length > 0 && <LikeManagerAmount list={like.products?.list}/>}
        <LikeList list={like.products?.list}/>
      </Box>
    );
  }
  return <Loader/>
};

export {PersonalAccountLike};