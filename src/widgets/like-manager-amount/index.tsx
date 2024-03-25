import {Box} from "@mui/material";
import {IProduct} from "../../entities/product/model/product-model.ts";
import {LikeManagerAmountContent} from "../../features/like-manager-amount-content";
import {ManagerTitle} from "../../shared/components/manager-title";
import {ManagerLayout} from "../../shared/components/manager-layout";
import {memo} from "react";

interface LikeManagerAmountProps {

  list?:IProduct[]
  
}

const LikeManagerAmount =  memo((props:LikeManagerAmountProps) => {
  return (
    <ManagerLayout>
      <ManagerTitle title={'Сумма'}/>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-end'}>
        <LikeManagerAmountContent products={props.list}/>
      </Box>
    </ManagerLayout>
  );
});

export {LikeManagerAmount};