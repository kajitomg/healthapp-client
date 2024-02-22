import {useTypedSelector} from "../../../shared/services/redux/hooks/use-typed-selector.ts";
import {useCallback} from "react";
import {useActions} from "../../../shared/services/redux/hooks/use-actions.ts";
import {useNavigate} from "react-router-dom";
import {selectCurrentPage} from "../store/page-controller/reducer.ts";

export const useSetPage = () => {
  const navigate = useNavigate()
  
  const pages = useTypedSelector(state => state.pageController)
  const page = useTypedSelector(state => selectCurrentPage(state))
  
  const {pageController} = useActions()
  
  const callbacks = {
    setPage:useCallback( (id:string,query?:string) => {
      pageController.setPage({id,redirect:navigate,query})
    },[pageController, navigate])
  }
  
  return {pages, page, ...callbacks}
}