import {Button} from "@mui/material";
import React, {useCallback} from "react";

interface ProductCardButtonProps {
  onClick?:() => void
}

const ProductCardButton = (props:ProductCardButtonProps) => {
  
  const callbacks = {
    onClick:useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      props.onClick && props.onClick()
    },[])
  }
  
  return (
    <Button size="small" variant={"contained"} onClick={callbacks.onClick}>Купить</Button>
  );
};

export {ProductCardButton};