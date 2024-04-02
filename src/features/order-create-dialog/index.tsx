import {DialogLayout} from "../../shared/components/dialog-layout";
import Box from "@mui/material/Box";
import {memo, useCallback, useState} from "react";
import {OrderCreateDialogContent} from "../order-create-dialog-content";
import {FormFieldDataType} from "../../shared/components/form-field";
import {useMediaQuery, useTheme} from "@mui/material";

interface OrderCreateDialogProps {
  
  popSnapName:string,
  
  isOpen?:boolean,
  
  onClose?:() => void,
  
  onSubmit?:(field:{ email?: FormFieldDataType, phonenumber?: FormFieldDataType, comment?: FormFieldDataType}) => void,
  
}

const OrderCreateDialog = memo((props:OrderCreateDialogProps) => {
  const [field, setField] = useState<{email?:FormFieldDataType,phonenumber?:FormFieldDataType,comment?:FormFieldDataType}>({})
  
  const theme = useTheme();
  const isMediaQuerySm = useMediaQuery(theme.breakpoints.down('sm'))
  
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
      disabled={field.comment?.error || field.email?.error || !field.email?.value || field.phonenumber?.error || !field.phonenumber?.value}
    >
      <Box display={'flex'} alignItems={'flex-start'} my={4} flexDirection={isMediaQuerySm ? 'column-reverse' :'row'}>
        <OrderCreateDialogContent popSnapName={props.popSnapName} field={field} setField={setField}/>
      </Box>
    </DialogLayout>
  );
});

export default OrderCreateDialog;