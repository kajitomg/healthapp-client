import { Store} from "redux";
import {Services} from "../index.ts";
import {rootState} from "../../../app/store/exports.ts";
import {configureStore} from "@reduxjs/toolkit";
import {api} from "../api";

export default function createStoreRedux(services:Services): Store {
  return configureStore({
      reducer:rootState,
      middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
          extraArgument: services,
        },
        serializableCheck: false,
      }).concat(api.middleware)
    }
  );
}
