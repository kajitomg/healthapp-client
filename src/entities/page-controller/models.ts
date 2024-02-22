import {ReactElement, ReactNode} from "react";
import {ParamsType} from "../params-controller/models.ts";

export type RoutesType = {
  id:string,
  path:string,
  name:string,
  redirect:string,
  element:ReactNode,
  children:RoutesType[],
  icon?:ReactElement,
  auth:boolean,
  nav:boolean,
  params:ParamsType
}
