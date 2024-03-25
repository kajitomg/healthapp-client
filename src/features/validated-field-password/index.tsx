import {Dispatch, SetStateAction, useRef} from 'react';
import {useFormValidation} from "../../shared/hooks/use-form-validation.ts";
import {FormField, FormFieldDataType} from "../../shared/components/form-field";

interface ValidatedFieldPasswordProps {
  
  label?:string,
  
  setData?:Dispatch<SetStateAction<{password?:FormFieldDataType}>>,
  
  value?:string | number,
  
  name?:string,
  
  validation?:ReturnType<typeof useFormValidation>
  
}

const ValidatedFieldPassword = (props:ValidatedFieldPasswordProps) => {
  const ref = useRef(null)
  
  const validation = useFormValidation(/^\S{4,20}$/,'Некорректный пароль(от 4 до 20 символов)')
  const {error,onChange,blur} = props.validation || validation
  
  return (
    <FormField
      ref={ref}
      required
      type={'password'}
      value={props.value || ''}
      size={'small'}
      InputProps={{ style: { fontSize: '16px', fontWeight: 'bold' } }}
      margin={'dense'}
      name={props.name || 'password'}
      label={props.label || 'Пароль'}
      setData={props.setData}
      onChange={onChange}
      helperText={blur ? error : undefined}
      fullWidth
      />
  );
};

export {ValidatedFieldPassword};