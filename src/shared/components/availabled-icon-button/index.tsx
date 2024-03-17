import {IconButton} from "@mui/material";
import React, {ReactNode, useCallback} from "react";

interface AvailabledIconButtonProps {
  
  icon?: ReactNode,
  
  availabledIcon?: ReactNode,
  
  onClick?:() => void,
  
  available?:boolean,
  
  size?:'medium' | 'large' | 'small'
}

const AvailabledIconButton = (props:AvailabledIconButtonProps) => {
  
  const callbacks = {
    onClick:useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      props.onClick && props.onClick()
    },[props.onClick])
  }
  
  return (
    <IconButton color={props.available ? 'primary' : 'default' } onClick={callbacks.onClick} size={props.size || 'medium'}>
      {!props.available && props.icon}
      {props.available && props.availabledIcon}
    </IconButton>
  );
};

export {AvailabledIconButton};