import {Dispatch, SetStateAction, useRef} from 'react';
import {useFormValidation} from "../../shared/hooks/use-form-validation.ts";
import {MaskedFormField} from "../../shared/components/masked-form-field";

interface ValidatedFieldPhonenumberProps {
  
  label?:string,
  
  setData?:Dispatch<SetStateAction<{phonenumber?:string}>>,
  
  value?:string | number,
  
  name?:string,
  
  validation?:ReturnType<typeof useFormValidation>
  
}

const ValidatedFieldPhonenumber = (props:ValidatedFieldPhonenumberProps) => {
  const ref = useRef(null)
  
  const validation = useFormValidation(new RegExp('^\\+?[78][\\s]?[-\\(]?[\\s]?\\d{3}?\\)?[\\s]?-?\\d{3}?-?\\d{2}?-?\\d{2}?$'),'Некорректный номер телефона')
  const {error,onChange,blur} = props.validation || validation
  
  return (
    <MaskedFormField
      mask={'+7 (999) 999-99-99'}
      ref={ref}
      required
      type={'phonenumber'}
      value={props.value || ''}
      size={'small'}
      InputProps={{ style: { fontSize: '16px', fontWeight: 'bold' } }}
      margin={'dense'}
      name={props.name || 'phonenumber'}
      label={props.label || 'Телефон'}
      setData={props.setData}
      onChange={onChange}
      helperText={blur ? error : undefined}
      fullWidth
    />
  );
};

export {ValidatedFieldPhonenumber};