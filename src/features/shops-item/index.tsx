import {Box, Divider, Typography} from "@mui/material";
import {Address} from "../../shared/models";


interface ShopsItemProps {
  item?:Address
}

const ShopsItem = (props:ShopsItemProps) => {
  return (
    <Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
        <Box display={'flex'} flexDirection={'column'} bgcolor={'white'} borderRadius={1} p={1}>
          <Typography>{props.item?.address}</Typography>
          <Typography>{props.item?.worktime}</Typography>
        </Box>
      </Box>
      <Divider/>
    </Box>
  );
};

export {ShopsItem};