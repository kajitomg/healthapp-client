import {useCallback, useRef} from "react";


export const useDebounce = <T extends unknown[]>(callback:(...args:T) => unknown,timeout:number) => {
  const timer = useRef<number>()
  
  const callbacks = {
    
    debounce:useCallback((...args:T) => {
      if(timer.current){
        clearTimeout(timer.current)
      }
      
      timer.current = setTimeout(() => callback(...args),timeout)
    },[callback,timeout])
    
  }
  
  return callbacks.debounce
}