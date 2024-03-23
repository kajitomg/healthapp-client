import Typography from "@mui/material/Typography";
import {TypographyProps} from "@mui/material";

type SecondPriceProps = {
  
  price?:number | string,
  
  isDiscount?:boolean,
  
} & TypographyProps

const SecondPrice = (props:SecondPriceProps) => {
  const {price, isDiscount, ...defProps} = props
  
  return (
    <Typography
      variant={"subtitle1"}
      fontSize={props.fontSize || 'medium'}
      fontWeight={'bold'}
      color={isDiscount ? 'forestgreen' : 'black'}
      textAlign={'right'}
      {...defProps}
    >
      {typeof price === 'string' ? price : price && Intl.NumberFormat('ru',{style: 'currency', currency: 'RUB'}).format(price)}
    </Typography>
  );
};

export {SecondPrice};