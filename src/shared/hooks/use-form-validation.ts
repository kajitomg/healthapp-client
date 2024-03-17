import {ChangeEvent, useCallback, useState} from "react";


export const useFormValidation = (validate:RegExp,errorText:string = '',initError:string = 'Поле не может быть пустым') => {
  const [error,setError] = useState(initError)
  const [blur,setBlur] = useState(false)
  
  const callbacks = {
    
    onChange:useCallback((e:ChangeEvent<HTMLInputElement>) => {
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
    },[setBlur,setError]),
    
    setError:useCallback((error:string) => {
     setError(error)
    },[setError]),
    
    setBlur:useCallback((blur:boolean) => {
      setBlur(blur)
    },[setBlur]),
    
  }
  
  return {error,blur,...callbacks}
}