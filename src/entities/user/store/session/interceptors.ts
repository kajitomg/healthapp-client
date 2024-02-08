import services from "../../../../shared/services";
import {retry} from "@reduxjs/toolkit/query/react";
import {sessionAPI} from "./api.ts";


export const sessionInterceptors = {
  refresh: () => services.interceptor.add(async (result) => {
    if (result.error && result.error.status === 401) {
      // try to get a new token
      const {data} = sessionAPI.useRefreshQuery()
      if (data) {
        // store the new token
        localStorage.setItem('token', data.accessToken)
        // retry the initial query
      } else {
        localStorage.removeItem('token')
        sessionAPI.useSignoutMutation()
        retry.fail(result.error)
      }
    }
  })
}