import {Dispatch, SetStateAction, useRef} from 'react';
import {useFormValidation} from "../../shared/hooks/use-form-validation.ts";
import {FormField} from "../../shared/components/form-field";

interface ValidatedFieldCommentProps {
  
  label?:string,
  
  setData?:Dispatch<SetStateAction<{comment?:string}>>,
  
  value?:string | number,
  
  name?:string,
  
  validation?:ReturnType<typeof useFormValidation>
  
}

const ValidatedFieldComment = (props:ValidatedFieldCommentProps) => {
  const ref = useRef(null)
  
  const validation = useFormValidation(new RegExp(/^\S}$/),'Некорректный комментарий)')
  const {error,onChange,blur} = props.validation || validation
  return (
    <FormField
      ref={ref}
      type={'comment'}
      value={props.value || ''}
      size={'small'}
      InputProps={{ style: { fontSize: '16px', fontWeight: 'bold' } }}
      margin={'dense'}
      name={props.name || 'comment'}
      label={props.label || 'Комментарий'}
      setData={props.setData}
      onChange={onChange}
      helperText={blur ? error : undefined}
      fullWidth
      multiline
      minRows={2}
    />
  );
};

export {ValidatedFieldComment};