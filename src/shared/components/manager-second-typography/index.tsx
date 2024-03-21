import {Typography, TypographyProps} from "@mui/material";

type ManagerSecondTypographyProps = TypographyProps

const ManagerSecondTypography = (props:ManagerSecondTypographyProps) => {
  return (
    <Typography fontSize={'x-small'} {...props}>{props.children}</Typography>
  );
};

export {ManagerSecondTypography};