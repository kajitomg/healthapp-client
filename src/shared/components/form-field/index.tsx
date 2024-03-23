import {TextField, TextFieldProps} from "@mui/material";
import {ChangeEvent, Dispatch, forwardRef, SetStateAction, useCallback} from "react";

export type FormFieldProps = {
  
  onChange?:(event:ChangeEvent<HTMLInputElement>) => void,
  
  setData?:Dispatch<SetStateAction<{ [name:string]:string | number}>>
  
} & Omit<TextFieldProps, 'ref'>

const FormField = forwardRef<HTMLInputElement,FormFieldProps>((props,ref) => {
  const {setData,onChange, ...defProps} = props

  const callbacks = {
    onChange: useCallback( (name?: string) => {
      return (event: ChangeEvent<HTMLInputElement>) => {
        if(name){
          setData && setData((prevData) => ({...prevData, [name]: event.target.value}));
          onChange && onChange(event)
        }
      }
    }, [setData, onChange]),
  }
  
  return (
    <TextField
      ref={ref}
      {...defProps}
      onChange={callbacks.onChange(props.name)}
      error={Boolean(props.helperText)}
    />
  );
});

export {FormField};