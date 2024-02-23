import {ReactNode, useEffect} from "react";
import {RoutesType} from "../../../page-controller/models.ts";
import {createParamsWithLocation} from "../../../../shared/utils/create-params-with-location.ts";
import {useParams} from "../../hooks/use-params.ts";

interface ParamsControllerLayoutProps {
  page?:RoutesType | null,
  children?:ReactNode
}

const ParamsControllerLayout = (props:ParamsControllerLayoutProps) => {
  const {setParams} = useParams({page:props.page})

  useEffect(() => {
    setParams(createParamsWithLocation())
  },[props.page])
  
  return (
    <>
      {props.children}
    </>
  );
};

export {ParamsControllerLayout};