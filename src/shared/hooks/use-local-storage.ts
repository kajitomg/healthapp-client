import {useCallback, useEffect, useState} from "react";

export const useLocalStorage = (key:string, initialValue?:any) => {
  const [storage,setStorage] = useState(
    () => JSON.parse(localStorage.getItem(key) || JSON.stringify([])) ?? initialValue
  );
  const callbacks = {
    
    setStorage:useCallback( (value:any) => {
      
      const newValue = typeof value === "function" ? value(storage) : value;
      localStorage.setItem(key, JSON.stringify(newValue));
      
      setStorage(newValue);
    }, [key,setStorage,storage])
  }
  useEffect(() => {
    function fromStorage(event:any) {
      console.log('da')
      if (event.key === key) {
        setStorage(JSON.parse(event.newValue));
      }
    }
    window.addEventListener("storage", fromStorage);
    return () => {
      window.removeEventListener("storage", fromStorage);
    };
  }, [key,setStorage,storage])
  
  return [storage, callbacks.setStorage];
}