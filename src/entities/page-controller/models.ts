import {ReactElement, ReactNode} from "react";
import {ParamsType} from "../../shared/models";

export type RoutesType = {
  id:string,
  path:string | string[],
  name:string,
  redirect:string,
  element:ReactNode,
  children:RoutesType[],
  icon?:ReactElement,
  auth?:boolean,
  nav:boolean,
  menu?:boolean,
  params:ParamsType,
}
