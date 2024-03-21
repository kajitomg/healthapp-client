import {Box, Typography} from "@mui/material";
import {AvailabledIconButton} from "../availabled-icon-button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CounterProps {
  
  onIncrement:() => void,
  
  onDecrement:() => void,
  
  count?:number,
  
}

const Counter = (props:CounterProps) => {
  
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      borderRadius={5}
      onClick={(e) => e.stopPropagation()}
    >
      <AvailabledIconButton icon={<AddIcon/>} onClick={props.onIncrement}/>
      <Typography>{props.count}</Typography>
      <AvailabledIconButton icon={<RemoveIcon/>} onClick={props.onDecrement}/>
    </Box>
  );
}

export {Counter};