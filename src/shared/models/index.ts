
export type ModelType = {
  id:number
}

export enum SortDirections {
  ASC = 'ASC',
  DESC = 'DESC',
}
export type ParamsType = {
  [name:string]:string | string[] | number | number[] | ParamsType
}