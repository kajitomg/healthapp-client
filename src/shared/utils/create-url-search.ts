import {ParamsType} from "../models";

const createURLSearch = (params:ParamsType) => {
  return new URLSearchParams(JSON.stringify(params)).toString();
}

export {createURLSearch}