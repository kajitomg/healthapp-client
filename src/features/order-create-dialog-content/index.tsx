import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ValidatedFieldPhonenumber} from "../validated-field-phonenumber";
import {ValidatedFieldEmail} from "../validated-field-email";
import {ValidatedFieldComment} from "../validated-field-comment";
import {plural} from "../../shared/utils/plural.ts";
import {MainPrice} from "../main-price";
import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {selectPopSnapData} from "../../entities/pop-snap/store/pop-snap/reducer.ts";
import {Dispatch, SetStateAction} from "react";
import {FormFieldDataType} from "../../shared/components/form-field";
import {useMediaQuery, useTheme} from "@mui/material";

interface OrderCreateDialogContentProps {
  
  popSnapName:string,
  
  field?:{email?: FormFieldDataType, phonenumber?: FormFieldDataType, comment?: FormFieldDataType},
  
  setField?:Dispatch<SetStateAction<{email?: FormFieldDataType, phonenumber?: FormFieldDataType, comment?: FormFieldDataType}>>
}

const OrderCreateDialogContent =(props:OrderCreateDialogContentProps) => {
  const {popSnapName,field,setField} = props
  
  const data = useTypedSelector(state => selectPopSnapData(state,popSnapName))
  
  
  const theme = useTheme();
  const isMediaQuerySm = useMediaQuery(theme.breakpoints.down('sm'))
  
  return (
    <>
      <Box
        flex={'1 1 50%'}
        noValidate
        component="form"
        width={isMediaQuerySm ? '100%' : 'auto'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 'auto',
        }}
      >
        <ValidatedFieldPhonenumber value={field?.phonenumber?.value} setData={setField}/>
        <ValidatedFieldEmail value={field?.email?.value} setData={setField}/>
        <ValidatedFieldComment value={field?.comment?.value} setData={setField}/>
      </Box>
      <Box display={'flex'} flex={'1 1 50%'} width={isMediaQuerySm ? '100%' : 'auto'} justifyContent={'space-between'} px={2} alignItems={'center'}>
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontSize={'x-small'}>Итого:</Typography>
          <Typography fontSize={'medium'} fontWeight={'normal'}>{data?.count} {plural(data?.count,{one:'товар',few:'товара',many:'товаров'})}</Typography>
        </Box>
        <Box>
          <MainPrice price={data?.total}/>
        </Box>
      </Box>
    </>
  );
};

export {OrderCreateDialogContent};