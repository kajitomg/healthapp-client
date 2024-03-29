import ReactInputMask from "react-input-mask";
import {ChangeEvent, forwardRef, memo, useCallback, useEffect} from "react";
import {FormField, FormFieldProps} from "../form-field";

type MaskedFormFieldProps = {
  
  mask:string | (string | RegExp)[]
  
  value?:string | number
  
} & FormFieldProps

const MaskedFormField = memo(forwardRef<HTMLInputElement,MaskedFormFieldProps>((props,ref) => {
  const {setData,onChange, ...defProps} = props
  
  const callbacks = {
    onChange: useCallback((name?: string) => {
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
    <ReactInputMask
      mask={props.mask}
      value={props.value}
      onChange={callbacks.onChange(props.name)}
    >
      {/*@ts-expect-error ошибка типа передаваемого в ReactInputMask*/}
      {() => (
        <FormField
          ref={ref}
          {...defProps}
          error={Boolean(props.helperText)}
        />
      )}
    </ReactInputMask>
  );
}));

export {MaskedFormField};