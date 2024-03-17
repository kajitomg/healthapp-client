import {DialogLayout} from "../../shared/components/dialog-layout";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectPopSnapData} from "../../entities/pop-snap/store/pop-snap/reducer.ts";
import {Box, Typography} from "@mui/material";
import {plural} from "../../shared/utils/plural.ts";
import {MainPrice} from "../main-price";
import {useCallback, useState} from "react";
import {ValidatedFieldEmail} from "../validated-field-email";
import {ValidatedFieldPhonenumber} from "../validated-field-phonenumber";
import {ValidatedFieldComment} from "../validated-field-comment";

interface OrderCreateDialogProps {
  
  popSnapName?:string,
  
  isOpen?:boolean,
  
  onClose?:() => void,
  
  onSubmit?:(field:{ email?: string, phonenumber?: string, comment?: string}) => void,
  
}

const OrderCreateDialog = (props:OrderCreateDialogProps) => {
  const data = useTypedSelector(state => selectPopSnapData(state,props.popSnapName))
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
        <Box
          flex={'1 1 50%'}
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
          }}
        >
          <ValidatedFieldPhonenumber value={field.phonenumber} setData={setField}/>
          <ValidatedFieldEmail value={field.email} setData={setField}/>
          <ValidatedFieldComment value={field.comment} setData={setField}/>
        </Box>
        <Box display={'flex'} flex={'1 1 50%'} justifyContent={'space-between'} px={2} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography fontSize={'x-small'}>Итого:</Typography>
            <Typography fontSize={'medium'} fontWeight={'normal'}>{data?.count} {plural(data?.count,{one:'товар',few:'товара',many:'товаров'})}</Typography>
          </Box>
          <Box>
            <MainPrice price={data?.total}/>
          </Box>
        </Box>
      </Box>
    </DialogLayout>
  );
};

export {OrderCreateDialog};