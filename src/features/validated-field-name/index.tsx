import {Dispatch, SetStateAction, useRef} from 'react';
import {useFormValidation} from "../../shared/hooks/use-form-validation.ts";
import {FormField, FormFieldDataType} from "../../shared/components/form-field";

interface ValidatedFieldNameProps {
  
  label?:string,
  
  setData?:Dispatch<SetStateAction<{name?:FormFieldDataType}>>,
  
  value?:string | number,
  
  name?:string,
  
  validation?:ReturnType<typeof useFormValidation>
  
}

const ValidatedFieldName = (props:ValidatedFieldNameProps) => {
  const ref = useRef(null)
  
  const validation = useFormValidation(new RegExp(/^\S{3,20}$/),'Некорректный никнейм(от 3 до 20 символов)')
  const {error,onChange,blur} = props.validation || validation
  
  return (
    <FormField
      ref={ref}
      type={'text'}
      value={props.value || ''}
      size={'small'}
      InputProps={{ style: { fontSize: '16px', fontWeight: 'bold' } }}
      margin={'dense'}
      name={props.name || 'name'}
      label={props.label || 'Никнейм'}
      setData={props.setData}
      onChange={onChange}
      helperText={blur ? error : undefined}
      fullWidth
      />
  );
};

export {ValidatedFieldName};