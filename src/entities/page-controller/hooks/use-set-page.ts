import {useTypedSelector} from "../../../shared/services/redux/hooks/use-typed-selector.ts";
import {useCallback} from "react";
import {useActions} from "../../../shared/services/redux/hooks/use-actions.ts";
import {useNavigate} from "react-router-dom";

export const useSetPage = () => {
  const navigate = useNavigate()
  
  const pages = useTypedSelector(state => state.pageController)
  
  const {pageController} = useActions()
  
  const callbacks = {
    setPage:useCallback(async (id:string) => {
      await pageController.setPage({id,redirect:navigate})
    },[navigate])
  }
  
  return {pages,...callbacks}
}