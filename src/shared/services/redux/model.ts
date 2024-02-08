import {rootState} from "../../../app/store/exports.ts";
import createStoreRedux from "./index.ts";

export type RootState = ReturnType<typeof rootState>
export type AppStore = ReturnType<typeof createStoreRedux>
export type AppDispatch = AppStore['dispatch']
