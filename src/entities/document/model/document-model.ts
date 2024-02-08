import {ModelType} from "../../../shared/models";

export interface IDocument extends ModelType  {
  name: string,
  path: string,
}