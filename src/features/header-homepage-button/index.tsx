import {ReactNode} from 'react';
import {Button} from "@mui/material";

interface HeaderHomepageButtonProps {
  onClick:(id:string) => void,
  children:ReactNode
}

const HeaderHomepageButton = (props:HeaderHomepageButtonProps) => {
  
  return (
    <Button onClick={() => props.onClick('main')}>
      {props.children}
    </Button>
  );
};

export {HeaderHomepageButton};