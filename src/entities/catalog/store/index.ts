import { default as catalogReducers} from './catalog/reducer.ts'
import {catalogActionsList} from "./catalog/reducer.ts";



const catalogState = {
  catalog:catalogReducers,
}

const catalogActions = {
  catalog:catalogActionsList,
}

export {catalogState,catalogActions}