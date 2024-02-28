import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry
} from '@reduxjs/toolkit/query/react'
import config from "../../../config.ts";
import services from "../index.ts";
import {rootInterceptor} from "../../../app/store/exports.ts";
import {RootState} from "../redux/model.ts";



// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: config.api.baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).session.token
    if (token) {
      headers.set('authentication', `Bearer ${token}`)
    }
    return headers
  },
})



const baseQueryWithInterceptors: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  
  let value: keyof typeof rootInterceptor
  for(value in rootInterceptor){
    await rootInterceptor[value]()
  }
  services.interceptor.call(result,baseQuery,api,extraOptions)
  
  return result
}


const baseQueryWithRetry = retry(baseQueryWithInterceptors, { maxRetries: 6 })

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: 'splitApi',
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ['User','Session','Product','Category','Type'],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
})
