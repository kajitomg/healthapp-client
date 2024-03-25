import {memo, ReactNode, useCallback} from 'react';
import Button from "@mui/material/Button";

interface HeaderHomepageButtonProps {
  onClick?:(id:string) => void,
  children:ReactNode
}

const HeaderHomepageButton = memo((props:HeaderHomepageButtonProps) => {
  
  const callbacks = {
    onCLick:useCallback(() => {
      props.onClick && props.onClick('main')
    },[props.onClick])
  }
  
  return (
    <Button onClick={callbacks.onCLick} title={'Вернуться на главную'} >
      {props.children}
    </Button>
  );
});

export {HeaderHomepageButton};