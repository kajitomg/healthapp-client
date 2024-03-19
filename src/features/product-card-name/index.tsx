import {Typography, TypographyProps} from "@mui/material";

type ProductCardNameProps = {
  name?:string
} & TypographyProps

const ProductCardName = (props:ProductCardNameProps) => {
  const {name, ...defProps} = props
  return (
    <Typography gutterBottom variant="h5" fontSize={'x-large'} fontWeight={'bold'}{...defProps}>{name}</Typography>
  );
};

export {ProductCardName};