import {useRedirect} from "./use-redirect.ts";
import {useCallback, useEffect} from "react";

export const useListenHistory = () => {
  const {redirect} = useRedirect()
  
  const callbacks = {
    //@ts-expect-error Найти тип
    onPopstate:useCallback((history) => {
      redirect(history.currentTarget?.location.pathname)
    },[redirect])
  }
  
  useEffect(() => {
    window.addEventListener('popstate', callbacks.onPopstate);
    return window.addEventListener('popstate', callbacks.onPopstate);
  },[callbacks.onPopstate])
}