import {useTypedSelector} from "../../shared/services/redux/hooks/use-typed-selector.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {ReactNode, useEffect} from "react";
import {Loader} from "../../shared/components/loader";

interface ProtectedProps {

  redirect:string,
  
  authPath?:boolean,
  
  children?:ReactNode,
  
}

const Protected = (props:ProtectedProps) => {
  const session = useTypedSelector(state => state.session)
  
  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(session.exists && !session.waiting && (location.pathname === '/login' || location.pathname === '/registration')){
      navigate(props.redirect,{state: {back: location.pathname }})
    }
  },[session.exists,session.waiting,location.pathname])
  
  if (session.waiting){
    return (<Loader />)
  } else
    return props.children;
  
};

export {Protected};