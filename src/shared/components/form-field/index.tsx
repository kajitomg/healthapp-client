import {TextField, TextFieldProps} from "@mui/material";
import {ChangeEvent, Dispatch, forwardRef, memo, SetStateAction, useCallback, useEffect} from "react";

export interface FormFieldDataType<T = string | number> { value:T,error:boolean }

export type FormFieldProps = {
  
  onChange?:(event:ChangeEvent<HTMLInputElement>) => void,
  
  setData?:Dispatch<SetStateAction<{ [name:string]:FormFieldDataType}>>
  
} & Omit<TextFieldProps, 'ref'>

const FormField = memo(forwardRef<HTMLInputElement,FormFieldProps>((props,ref) => {
  const {setData,onChange, ...defProps} = props

  const callbacks = {
    onChange: useCallback( (name?: string) => {
      return (event: ChangeEvent<HTMLInputElement>) => {
        if(name){
          setData && setData((prevData) => ({...prevData, [name]: {...prevData[name], value:event.target.value}}));
          onChange && onChange(event)
        }
      }
    }, [setData, onChange]),
  }
  
  useEffect(() => {
    if(props.name){
      const name = props.name
      setData && setData((prevData) => ({...prevData, [name]: {...prevData[name],error:Boolean(props.helperText), value: prevData[name]?.value}}));
    }
  },[props.helperText])
  
  return (
    <TextField
      ref={ref}
      {...defProps}
      onChange={callbacks.onChange(props.name)}
      error={Boolean(props.helperText)}
    />
  );
}));

export {FormField};