import {Button, Typography} from "@mui/material";
import React, {ReactNode, useCallback} from "react";

interface AvailabledButtonProps {
  
  children?: ReactNode,
  
  availabledChildren?: ReactNode,
  
  onClick?:() => void,
  
  available?:boolean,
  
  textTransform?:'capitalize' | 'uppercase' | 'none' | 'unset',
  
  fontSize?:'small' | 'medium' | 'large'
  
  fontWeight?:'bold' | 'normal' | 'lighter',
  
  size?:'small' | 'medium' | 'large'
}

const AvailabledButton = (props:AvailabledButtonProps) => {
  
  const callbacks = {
    onClick:useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      props.onClick && props.onClick()
    },[props.onClick])
  }
  
  return (
    <Button size={props.size || 'small'} variant={props.available ? 'outlined':'contained'} onClick={callbacks.onClick}>
      <Typography textTransform={props.textTransform || 'none'} fontSize={props.fontSize || 'medium'} fontWeight={props.fontWeight || 'normal'}>
        {!props.available && props.children}
        {props.available && props.availabledChildren}
      </Typography>
    </Button>
  );
};

export {AvailabledButton};