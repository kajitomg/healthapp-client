import {Breakpoint} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import React, {memo, ReactNode, useCallback} from "react";

interface DialogLayoutProps {
  
  isOpen?:boolean,
  
  onClose?:() => void,
  
  onSubmit?:() => void,
  
  title?:string,
  
  contentText?:string,
  
  children?:ReactNode,
  
  closeButtonText?:string,
  
  disabled?:boolean,
  
  submitButtonText?:string,
  
  maxWidth?:Breakpoint
  
}

const DialogLayout = memo((props:DialogLayoutProps) => {
  
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
        {props.submitButtonText && <Button disabled={props.disabled} variant={'contained'} color={'primary'} onClick={callbacks.onSubmit}>
          <Typography textTransform={'none'}>{props.submitButtonText}</Typography>
        </Button>}
      </DialogActions>
    </Dialog>
  );
});

export {DialogLayout};