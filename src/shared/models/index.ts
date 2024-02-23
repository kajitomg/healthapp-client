
export type ModelType = {
  id:number
}

export type SortTypes  = 'ASC' | 'DESC' | ''

export type ParamsType = {
  [name:string]:string | string[] | number | number[] | ParamsType
}