import {IDocument} from "../../model/document-model.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";



export interface DocumentState {
  item:IDocument | null,
  error:FetchBaseQueryError | null,
  waiting:boolean
}


const initialState: DocumentState = {
  item:null,
  error:null,
  waiting:true
}

