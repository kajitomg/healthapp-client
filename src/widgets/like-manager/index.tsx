import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {LikeManagerContent} from "../../features/like-manager-content";
import {LikeManagerTitle} from "../../features/like-manager-title";
import {LikeManagerActions} from "../../features/like-manager-actions";

interface LikeManagerProps {

  list?:IProduct[]
  
}

const LikeManager = (props:LikeManagerProps) => {
  return (
    <Box bgcolor={'white'} borderRadius={1} boxShadow={theme => theme.shadows[1]} p={1} m={1}>
      <LikeManagerTitle title={'Сумма'}/>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-end'}>
        <LikeManagerContent products={props.list}/>
        <LikeManagerActions/>
      </Box>
    </Box>
  );
};

export {LikeManager};