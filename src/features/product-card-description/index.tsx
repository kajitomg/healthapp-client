import Typography from "@mui/material/Typography";
import {TypographyProps} from "@mui/material";

type ProductCardDescriptionProps = {
  name?:string
} & TypographyProps

const ProductCardDescription = (props:ProductCardDescriptionProps) => {
  const {name, ...defProps} = props
  return (
    <Typography variant="body2" color="text.secondary" {...defProps}>{name}</Typography>
  );
};

export {ProductCardDescription};