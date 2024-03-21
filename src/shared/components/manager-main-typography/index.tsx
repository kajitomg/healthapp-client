import {Typography, TypographyProps} from "@mui/material";

type ManagerMainTypographyProps = TypographyProps

const ManagerMainTypography = (props:ManagerMainTypographyProps) => {
  return (
    <Typography fontSize={'medium'} fontWeight={'normal'} {...props}>{props.children}</Typography>
  );
};

export {ManagerMainTypography};