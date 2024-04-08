import {LikeManagerAmount} from "../../widgets/like-manager-amount";
import {LikeList} from "../../widgets/like-list";
import {Loader} from "../../shared/components/loader";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import Box from "@mui/material/Box";

const PersonalAccountLike = () => {
  const like = useTypedSelector(state => state.like)

  if(like.products?.list || (like.products?.list === undefined && !like.products?.waiting && !like.waiting)){
    return (
      <Box display={'flex'} flexDirection={'column'}>
        {like.products?.list && like.products?.list.length > 0 && <LikeManagerAmount list={like.products?.list}/>}
        <Box>
          <LikeList list={like.products?.list}/>
        </Box>
      </Box>
    );
  }
  return <Loader/>
};

export {PersonalAccountLike};