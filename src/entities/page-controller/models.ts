import {ReactElement} from "react";
import {ParamsType} from "../../shared/models";

export type RoutesType = {
  id:string,
  path:string | string[],
  name:string,
  redirect:string,
  element:ReactElement,
  children:RoutesType[],
  icon?:ReactElement,
  auth?:boolean,
  nav:boolean,
  menu?:boolean,
  params:ParamsType,
}
