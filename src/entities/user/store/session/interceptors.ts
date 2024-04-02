import services from "../../../../shared/services";
import {retry} from "@reduxjs/toolkit/query/react";

{/*@ts-expect-error ошибка*/}
import {QueryReturnValue} from "@reduxjs/toolkit/query/baseQueryTypes";


export const sessionInterceptors = {
  refresh: () => services.interceptor.add(async (result,baseQuery,api,extraOptions) => {
    if (result.error && result.error.status === 401) {
      
      // try to get a new token
      const response:QueryReturnValue<{accessToken:string}> = await baseQuery(`/api/users/refresh`,api,extraOptions)
      if (response.data) {
        // store the new token
        localStorage.setItem('token', response.data.accessToken)
        // retry the initial query
      } else {
        localStorage.removeItem('token')
        await baseQuery({url:`/api/users/signout`,method:'POST'},api,extraOptions)
        retry.fail(result.error)
      }
    }
  })
}