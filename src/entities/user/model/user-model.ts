import {ModelType} from "../../../shared/models";

export interface IUser extends ModelType  {
  name: string,
  email: string,
  roleId:number
  password?:string,
  role?:string
}

