import {DialogLayout} from "../../shared/components/dialog-layout";
import Box from "@mui/material/Box";
import {memo, useCallback, useState} from "react";
import {OrderCreateDialogContent} from "../order-create-dialog-content";

interface OrderCreateDialogProps {
  
  popSnapName:string,
  
  isOpen?:boolean,
  
  onClose?:() => void,
  
  onSubmit?:(field:{ email?: string, phonenumber?: string, comment?: string}) => void,
  
}

const OrderCreateDialog = memo((props:OrderCreateDialogProps) => {
  const [field, setField] = useState<{email?:string,phonenumber?:string,comment?:string}>({})
  
  const callbacks = {
    
    onSubmit:useCallback(async () => {
      props.onSubmit && props.onSubmit(field)
    },[field])
    
  }
  return (
    <DialogLayout
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={callbacks.onSubmit}
      title={'Заявка на оформление заказа'}
      submitButtonText={'Оставить заявку'}
      closeButtonText={'Отменить'}
    >
      <Box display={'flex'} alignItems={'flex-start'} my={4}>
        <OrderCreateDialogContent popSnapName={props.popSnapName} field={field} setField={setField}/>
      </Box>
    </DialogLayout>
  );
});

export default OrderCreateDialog;