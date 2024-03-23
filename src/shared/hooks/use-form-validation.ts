import {ChangeEvent, useCallback, useState} from "react";
import {useDebounce} from "./use-debounce.ts";


export const useFormValidation = (validate:RegExp,errorText:string = '',initError:string = 'Поле не может быть пустым') => {
  const [error,setError] = useState(initError)
  const [blur,setBlur] = useState(false)
  
  const callbacks = {
    
    onChange:useDebounce<[e:ChangeEvent<HTMLInputElement>]>(useCallback((e:ChangeEvent<HTMLInputElement>) => {
      if(!blur){
        setBlur(true)
      }
      if(e.target.value.length === 0){
        setBlur(false)
      }
      if(validate.test(String(e.target.value).toLowerCase())){
        setError('')
      }else {
        setError(errorText)
      }
    },[setBlur,setError]),200),
    
    setError:useDebounce(useCallback((error:string) => {
     setError(error)
    },[setError]),200),
    
    setBlur:useDebounce(useCallback((blur:boolean) => {
      setBlur(blur)
    },[setBlur]),200),
    
  }
  
  return {error,blur,...callbacks}
}