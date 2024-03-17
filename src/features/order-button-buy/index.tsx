import {ReactNode, useCallback} from 'react';
import {Button} from "@mui/material";

interface OrderButtonBuyProps {
  
  fullWidth?:boolean,
  
  children?:ReactNode,
  
  onClick?:() => void
}

const OrderButtonBuy = (props:OrderButtonBuyProps) => {
  const {onClick} = props
  
  const callbacks = {
    onClick:useCallback(() => {
      onClick && onClick()
    },[onClick])
  }
  
  return (
    <Button fullWidth={props.fullWidth} variant={'contained'} onClick={callbacks.onClick}>{props.children}</Button>
  );
};

export {OrderButtonBuy};