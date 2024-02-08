import { default as documentsReducers} from './documents/reducer.ts';

const documentState = {
  documents:documentsReducers,
}
const documentActions = {
  ...documentsActions,
}

export {documentState, documentActions}