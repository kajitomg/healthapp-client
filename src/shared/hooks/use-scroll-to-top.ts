import {DependencyList, useEffect, useRef} from "react";

export const useScrollToTop = (deps:DependencyList) => {
  
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    ref.current?.scrollIntoView({block:'start'})
    
  }, deps);
  
  return ref
}