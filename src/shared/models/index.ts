
export type ModelType = {
  id:number
}

export enum SortDirections {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ParamsType = {[name:string]: string | string[] | number | number[] | ParamsType}

export type SortTypes = Record<string, string>

export interface Address {
  
  id:string,
  
  address?:string,
  
  phonenumbers?:string[],
  
  emails?:string[],
  
  worktime?:string,
}