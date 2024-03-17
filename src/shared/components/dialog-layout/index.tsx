import {
  Breakpoint, Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Typography
} from "@mui/material";
import React, {ReactNode, useCallback} from "react";

interface DialogLayoutProps {
  
  isOpen?:boolean,
  
  onClose?:() => void,
  
  onSubmit?:() => void,
  
  title?:string,
  
  contentText?:string,
  
  children?:ReactNode,
  
  closeButtonText?:string,
  
  submitButtonText?:string,
  
  maxWidth?:Breakpoint
  
}

const DialogLayout = (props:DialogLayoutProps) => {
  
  const callbacks = {
    
    onSubmit:useCallback((event:React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      props.onSubmit && props.onSubmit()
    
    },[props.onSubmit]),
    
    onClose:useCallback((event:React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      props.onClose && props.onClose()
      
    },[props.onClose]),
  }
  
  return (
    <Dialog open={Boolean(props.isOpen)} onClose={props.onClose} fullWidth maxWidth={props.maxWidth || 'sm'}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText mb={3}>{props.contentText}</DialogContentText>
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button variant={'text'} color={'inherit'} onClick={callbacks.onClose}>
          <Typography textTransform={'none'}>{props.closeButtonText || 'Закрыть'}</Typography>
        </Button>
        {props.submitButtonText && <Button variant={'contained'} color={'primary'} onClick={callbacks.onSubmit}>
          <Typography textTransform={'none'}>{props.submitButtonText}</Typography>
        </Button>}
      </DialogActions>
    </Dialog>
  );
};

export {DialogLayout};