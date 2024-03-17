import {AvailabledButton} from "../../shared/components/availabled-button";
import {useCallback} from "react";

interface ProductButtonBuyProps {
  
  onClick?:() => void,
  
  onClickAvailable?:() => void,
  
  isAvailable?:boolean
}

const ProductButtonBuy = (props:ProductButtonBuyProps) => {
  const {isAvailable,onClickAvailable,onClick} = props
  
  const callbacks = {
    onClick:useCallback(() => {
      isAvailable && onClickAvailable  && onClickAvailable()
      !isAvailable && onClick && onClick()
    },[onClick,onClickAvailable,isAvailable])
  }
  
  return (
    <AvailabledButton availabledChildren={'В корзине'} onClick={callbacks.onClick} available={isAvailable} fontSize={'small'} fontWeight={'bold'} size={'medium'}>Купить</AvailabledButton>
  );
};

export {ProductButtonBuy};