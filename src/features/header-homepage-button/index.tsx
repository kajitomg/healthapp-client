import {ReactNode, useCallback} from 'react';
import {Button} from "@mui/material";

interface HeaderHomepageButtonProps {
  onClick?:(id:string) => void,
  children:ReactNode
}

const HeaderHomepageButton = (props:HeaderHomepageButtonProps) => {
  
  const callbacks = {
    onCLick:useCallback(() => {
      props.onClick && props.onClick('main')
    },[])
  }
  
  return (
    <Button onClick={callbacks.onCLick} title={'Вернуться на главную'} >
      {props.children}
    </Button>
  );
};

export {HeaderHomepageButton};