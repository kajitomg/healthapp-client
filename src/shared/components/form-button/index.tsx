import {Button, SxProps, Typography} from "@mui/material";

interface FormButtonProps {
  
  type?:"button" | "submit" | "reset",
  
  children?:string,
  
  variant?:"text" | "contained" | "outlined",
  
  size?:'large' | 'small' | 'medium',
  
  fontWeight?:'bold' | 'normal' | 'lighter',
  
  fontSize?:'small' | 'medium' | 'large',
  
  textTransform?:'uppercase' | 'capitalize' | 'unset' | 'none'
  
  disabled?:boolean,
  
  sx?:SxProps,
  
  fullWidth?:boolean,
}

const FormButton = (props:FormButtonProps) => {
  return (
    <Button disabled={props.disabled} fullWidth={props.fullWidth} type={props.type} variant={props.variant || 'contained'} color={'primary'} size={props.size} sx={props.sx}>
      <Typography fontSize={props.fontSize} fontWeight={props.fontWeight} textTransform={props.textTransform}>{props.children}</Typography>
    </Button>
  );
};

export {FormButton};