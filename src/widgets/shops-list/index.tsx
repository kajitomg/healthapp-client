import {Box, Divider, SxProps, Typography} from "@mui/material";
import {List} from "../../shared/components/list";
import {useCallback} from "react";
import {address, ShopsItem} from "../../features/shops-item";

interface ShopsListProps {
  
  sx?:SxProps
  
}
const shops:address[] = [
  {
    id:'Главный магазин',
    address:'192029, г.Санкт-Петербург, пр.Обуховской обороны, д.76, корп 7, лит А , пом. 2301',
    worktime:'Ежедневно с 8:00 до 20:00'
  },
]

const ShopsList = (props:ShopsListProps) => {
  
  const renders = {
    item:useCallback((shop:address) => (
      <ShopsItem key={shop.id} item={shop}/>
    ),[])
  }
  return (
    <Box sx={{...props.sx}}  bgcolor={'white'} borderRadius={1} boxShadow={theme => theme.shadows[1]} my={1} p={1} height={'100%'}>
      <Box my={1}>
        <Typography fontSize={'xx-large'} fontWeight={'bold'}>Наши магазины</Typography>
      </Box>
      <Divider/>
      <Box height={'calc(100% - 80px)'}>
        <Box overflow={'auto'} height={'100%'}>
          <List list={shops} renderItem={renders.item}/>
        </Box>
      </Box>
    </Box>
  );
};

export {ShopsList};