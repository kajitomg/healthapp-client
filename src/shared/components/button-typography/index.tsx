import {Typography, TypographyProps} from "@mui/material";

type ButtonTypographyProps = TypographyProps

const ButtonTypography = (props:ButtonTypographyProps) => {
  return (
    <Typography textTransform={'none'} fontWeight={'bold'} {...props}>
      {props.children}
    </Typography>
  );
};

export {ButtonTypography};