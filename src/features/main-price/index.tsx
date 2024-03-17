import {Typography} from "@mui/material";

interface MainPriceProps {
  
  price?:number | string,
  
  isDiscount?:boolean
  
}

const MainPrice = (props:MainPriceProps) => {
  
  return (
    <Typography
      fontSize={props.isDiscount ? 'x-small' : 'medium'}
      fontWeight={'bold'}
      textAlign={'right'}
      variant={"subtitle1"}
      color={props.isDiscount ? 'crimson' : 'black'}
      sx={{
        ...(props.isDiscount && {textDecoration:'line-through'})
      }}
    >
      {typeof props.price === 'string' ? props.price : Intl.NumberFormat('ru',{style: 'currency', currency: 'RUB'}).format(props.price)}
    </Typography>
  );
};

export {MainPrice};