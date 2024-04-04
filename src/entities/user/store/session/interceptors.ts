import services from "../../../../shared/services";
import {retry} from "@reduxjs/toolkit/query/react";

{/*@ts-expect-error ошибка*/}
import {QueryReturnValue} from "@reduxjs/toolkit/query/baseQueryTypes";


export const sessionInterceptors = {
  refresh: () => services.interceptor.add(async (result,baseQuery,api,extraOptions) => {
    if (result.error && result.error.status === 401) {

      if(result.meta.request.url === 'http://localhost:5000/api/users/refresh') return
      
      const response:QueryReturnValue<{accessToken:string}> = await baseQuery(`/api/users/refresh`,api,extraOptions)
      if (response.data) {
        
        localStorage.setItem('token', response.data.accessToken)
        
      } else {
        await baseQuery({url:`/api/users/signout`,method:'POST'},api,extraOptions)
        localStorage.removeItem('token')
        retry.fail(result.error)
      }
    }
  })
}