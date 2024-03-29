import {BaseQueryApi, BaseQueryFn} from "@reduxjs/toolkit/query/react";
{/*@ts-expect-error ошибка*/}
import {QueryReturnValue} from "@reduxjs/toolkit/query/baseQueryTypes";


class Interceptor {
  private list:((result?:QueryReturnValue,baseQuery?:BaseQueryFn,api?:BaseQueryApi,extraOptions?:Record<string, any>) => void | Promise<void>)[] = []
  private subsribers:(() => void)[] = []
  
  public add = (callback:(result:QueryReturnValue,baseQuery:BaseQueryFn,api:BaseQueryApi,extraOptions:Record<string, any>) => void) => {
    //@ts-expect-error Определить тип
    this.list.push(callback)
    this.publish()
  }
  
  public call = (result?:QueryReturnValue,baseQuery?:BaseQueryFn,api?:BaseQueryApi,extraOptions?:Record<string, any>) => {
    this.list.map((interceptor) => {
      interceptor(result,baseQuery,api,extraOptions)
    })
    
    this.publish()
  }
  
  private publish() {
    
    for (const callback of this.subsribers) {
      callback();
    }
    
  }
  
}

export {Interceptor}