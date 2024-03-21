import {Box, Divider, SxProps, Typography} from "@mui/material";
import {List} from "../../shared/components/list";
import {useCallback} from "react";
import {ShopsItem} from "../../features/shops-item";
import {Address} from "../../shared/models";
import {shops} from "../../mock/data.ts";
import {ManagerLayout} from "../../shared/components/manager-layout";

interface ShopsListProps {
  
  sx?:SxProps
  
}

const ShopsList = (props:ShopsListProps) => {
  
  const renders = {
    item:useCallback((shop:Address) => (
      <ShopsItem key={shop.id} item={shop}/>
    ),[])
  }
  return (
    <ManagerLayout sx={{...props.sx}}>
      <Box my={1}>
        <Typography fontSize={'xx-large'} fontWeight={'bold'}>Наши магазины</Typography>
      </Box>
      <Divider/>
      <Box height={'calc(100% - 80px)'}>
        <Box overflow={'auto'} height={'100%'}>
          <List list={shops} renderItem={renders.item}/>
        </Box>
      </Box>
    </ManagerLayout>
  );
};

export {ShopsList};