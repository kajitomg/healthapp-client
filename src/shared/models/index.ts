
export type ModelType = {
  id:number
}

export enum SortDirections {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ParamsType = Record<string, string | string[] | number | number[] | Record<string, string | string[] | number | number[]>>

export type SortTypes = Record<string, string>

export interface Address {
  
  id:string,
  
  address?:string,
  
  phonenumbers?:string[],
  
  emails?:string[],
  
  worktime?:string,
}