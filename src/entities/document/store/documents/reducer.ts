import {IDocument} from "../../model/document-model.ts";



export interface DocumentState {
  item:IDocument | null,
  error:ErrorType | null,
  waiting:boolean
}


const initialState: DocumentState = {
  item:null,
  error:null,
  waiting:true
}

