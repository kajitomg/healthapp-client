import {Typography} from "@mui/material";

interface SecondPriceProps {
  
  price?:number | string,
  
  isDiscount?:boolean,
  
  size?:'small'|'medium'|'large'|'x-small'
  
}

const SecondPrice = (props:SecondPriceProps) => {
  return (
    <Typography
      variant={"subtitle1"}
      fontSize={props.size || 'medium'}
      fontWeight={'bold'}
      color={props.isDiscount ? 'forestgreen' : 'black'}
      textAlign={'right'}
    >
      {typeof props.price === 'string' ? props.price : Intl.NumberFormat('ru',{style: 'currency', currency: 'RUB'}).format(props.price)}
    </Typography>
  );
};

export {SecondPrice};