import {ReactNode, useEffect} from "react";
import {useActions} from "../../../../shared/services/redux/hooks/use-actions.ts";
import {RoutesType} from "../../../page-controller/models.ts";
import {createParamsWithLocation} from "../../../../shared/utils/create-params-with-location.ts";

interface ParamsControllerLayoutProps {
  page?:RoutesType | null,
  children?:ReactNode
}

const ParamsControllerLayout = (props:ParamsControllerLayoutProps) => {
  const {paramsController} = useActions()

  useEffect(() => {
    paramsController.set({page:props.page,newParams:createParamsWithLocation()})
  },[props.page])
  
  return (
    <>
      {props.children}
    </>
  );
};

export {ParamsControllerLayout};