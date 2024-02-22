
import {IImage} from "../../model/image-model.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";



export interface ImageState {
  item:IImage | null,
  error:FetchBaseQueryError | null,
  waiting:boolean
}

const initialState: ImageState = {
  item:null,
  error:null,
  waiting:true
}
