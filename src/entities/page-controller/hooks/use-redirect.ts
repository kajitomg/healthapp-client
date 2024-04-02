import {useCallback} from "react";
import {To, useLocation, useNavigate} from "react-router-dom";
import {usePage} from "./use-page.ts";
import {useParams} from "../../params-controller/hooks/use-params.ts";
import {ParamsType} from "../../../shared/models";

export const useRedirect = () => {
  const {setPage,pages} = usePage()
  const {setParams} = useParams()
  
  const navigate = useNavigate()
  const location = useLocation()
  
  const callbacks = {
    redirect:useCallback( (path:To,options?:{query?:string,params?:ParamsType,replace?:boolean}) => {
      if(path) {
        const page = pages.list.find(page => page.path === path || page.path.includes(path.toString()))

        if(page){
          setPage(page.id,options?.query)
          setParams(options?.params || {},page,options?.replace)
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