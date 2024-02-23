import {ParamsType} from "../models";
import {paramsToObject} from "./params-to-object.ts";
import {getLocationParams} from "./get-location-params.ts";

export const createParamsWithLocation = (newParams?:ParamsType) => {
  return {...paramsToObject(new URLSearchParams(getLocationParams()).entries()),...newParams}
}