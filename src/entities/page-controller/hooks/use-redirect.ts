import {useCallback} from "react";
import {To, useLocation, useNavigate} from "react-router-dom";
import {useSetPage} from "./use-set-page.ts";
import {useParams} from "../../params-controller/hooks/use-params.ts";

export const useRedirect = () => {
  const {setPage,pages} = useSetPage()
  const {setParams} = useParams()
  
  const navigate = useNavigate()
  const location = useLocation()
  
  
  const callbacks = {
    redirect:useCallback( (path:To) => {

      if(path) {
        const page = pages.list.find(page => page.path === path || page.path.includes(path.toString()))

        if(page){
          setPage(page.id,)
          setParams({},page)
        }
      }
    },[navigate,pages,setPage,setParams]),
    back:useCallback( async () => {
      const back = location.state?.back && location.state?.back !== location.pathname
        ? location.state?.back
        : '/';
      if(back) {
        const page = pages.list.find(page => page.path === back)
        if(page){
          await setPage(page.id)
          await setParams({},page)
          
          await navigate(back,{state:{back:location.pathname}});
        }
        
      }
    },[navigate]),
  }
  
  return {...callbacks}
}