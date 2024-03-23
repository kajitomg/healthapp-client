import Typography from "@mui/material/Typography";
import {TypographyProps} from "@mui/material";

type CategoryCardNameProps = {
  name?:string
} & TypographyProps

const CategoryCardName = (props:CategoryCardNameProps) => {
  const {name, ...defProps} = props
  return (
    <Typography gutterBottom fontWeight={'bold'} variant="h5" {...defProps}>{name}</Typography>
  );
};

export {CategoryCardName};