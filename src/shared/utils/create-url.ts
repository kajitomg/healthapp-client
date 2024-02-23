import {getLocationPathname} from "./get-location-pathname.ts";
import {createURLSearch} from "./create-url-search.ts";
import {getLocationHash} from "./get-location-hash.ts";
import {ParamsType} from "../models";


const createURL = (params:ParamsType) => {
  const urlSearch = createURLSearch(params)
  
  return getLocationPathname() + (urlSearch ? `?${urlSearch}`: '') + getLocationHash()
}

export {createURL}