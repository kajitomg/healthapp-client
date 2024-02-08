
import {IImage} from "../../model/image-model.ts";



export interface ImageState {
  item:IImage | null,
  error:ErrorType | null,
  waiting:boolean
}

const initialState: ImageState = {
  item:null,
  error:null,
  waiting:true
}
