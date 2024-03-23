import Typography from "@mui/material/Typography";
import {TypographyProps} from "@mui/material";

type MainPriceProps = {
  
  price?:number | string,
  
  isDiscount?:boolean
  
} & TypographyProps

const MainPrice = (props:MainPriceProps) => {
  const {price, isDiscount, ...defProps} = props
  
  return (
    <Typography
      fontSize={isDiscount ? 'x-small' : 'medium'}
      fontWeight={'bold'}
      textAlign={'right'}
      variant={"subtitle1"}
      color={isDiscount ? 'crimson' : 'black'}
      sx={{
        ...(isDiscount && {textDecoration:'line-through'})
      }}
      {...defProps}
    >
      {typeof price === 'string' ? price : price && Intl.NumberFormat('ru',{style: 'currency', currency: 'RUB'}).format(price)}
    </Typography>
  );
};

export {MainPrice};