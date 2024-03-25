import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useLocation} from "react-router-dom";
import {memo, ReactNode, useEffect} from "react";
import {Loader} from "../../shared/components/loader";
import {useRedirect} from "../../entities/page-controller/hooks/use-redirect.ts";

interface ProtectedProps {

  redirect:string,
  
  authPath?:boolean,
  
  children?:ReactNode,
  
}

const Protected =  memo((props:ProtectedProps) => {
  const session = useTypedSelector(state => state.session)
  
  const location = useLocation()
  const {redirect} = useRedirect()
  
  useEffect(() => {
    if(props.authPath && !session.exists && !session.waiting){
      redirect(props.redirect)
    }
    if(!props.authPath && props.authPath !== undefined && session.exists && !session.waiting){
      redirect(props.redirect)
    }
  },[session.exists,session.waiting,location.pathname])

  if (props.authPath ? session.waiting  : (session.exists || session.waiting) && props.authPath !== undefined ){
    return (<Loader />)
  } else
    return props.children;
  
});

export {Protected};