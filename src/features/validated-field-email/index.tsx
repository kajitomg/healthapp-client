import {Dispatch, SetStateAction, useRef} from 'react';
import {useFormValidation} from "../../shared/hooks/use-form-validation.ts";
import {FormField} from "../../shared/components/form-field";

interface ValidatedFieldEmailProps {
  
  label?:string,
  
  setData?:Dispatch<SetStateAction<{email?:string}>>,
  
  value?:string | number,
  
  name?:string,
  
  validation?:ReturnType<typeof useFormValidation>
  
}

const ValidatedFieldEmail = (props:ValidatedFieldEmailProps) => {
  const ref = useRef(null)
  
  const validation = useFormValidation(new RegExp(/^\S+@\S+\.\S+$/),'Некорректный email')
  const {error,onChange,blur} = props.validation || validation
  
  return (
    <FormField
      ref={ref}
      required
      type={'email'}
      value={props.value || ''}
      size={'small'}
      InputProps={{ style: { fontSize: '16px', fontWeight: 'bold' } }}
      margin={'dense'}
      name={props.name || 'email'}
      label={props.label || 'Email'}
      setData={props.setData}
      onChange={onChange}
      helperText={blur ? error : undefined}
      fullWidth
    />
  );
};

export {ValidatedFieldEmail};