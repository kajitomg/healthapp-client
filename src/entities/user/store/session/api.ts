import {api} from "../../../../shared/services/api";
import {IUser} from "../../model/user-model.ts";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {ApiOptions} from "../../../../shared/services/api/model.ts";


export const sessionAPI = api.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation<baseEntitiesState & {item:IUser,accessToken:string}, {data:{email?:string,password?:string},options?:ApiOptions}>({
      query: ({data}) => ({
        url: `/api/users/signin`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Session'],
      //@ts-expect-error Неиспользуемая константа
      transformResponse:(response:baseEntitiesState & {item:IUser,accessToken:string}, meta, arg) => {
        arg.options?.onSuccess && arg.options?.onSuccess()
        return response;
      },
      extraOptions:{maxRetries:0}
    }),
    signup: build.mutation<baseEntitiesState & {item:IUser,accessToken:string}, {data:{email?:string,password?:string,name?:string},options?:ApiOptions}>({
      query: ({data}) => ({
        url: `/api/users/signup`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Session'],
      //@ts-expect-error Неиспользуемая константа
      transformResponse:(response:baseEntitiesState & {item:IUser,accessToken:string}, meta, arg) => {
        arg.options?.onSuccess && arg.options?.onSuccess()
        return response;
      },
      extraOptions:{maxRetries:0}
    }),
    signout: build.mutation<IUser, void>({
      query: () => ({
        url: `/api/users/signout`,
        method: 'POST'
      }),
      invalidatesTags: ['Session'],
      extraOptions:{maxRetries:0}
    }),
    refresh: build.query<baseEntitiesState & {item:IUser,accessToken:string}, { options?:ApiOptions } | undefined>({
      query: () => ({
        url: `/api/users/refresh`,
      }),
      providesTags: () => ['Session'],
      //@ts-expect-error Неиспользуемая константа
      transformResponse:(response:baseEntitiesState & {item:IUser,accessToken:string}, meta, arg) => {
        arg?.options?.onSuccess && arg?.options?.onSuccess()
        return response;
      },
      extraOptions:{maxRetries:0}
    }),
  })
})

export const {
  useSignoutMutation,
  useSigninMutation,
  useSignupMutation,
  useRefreshQuery,
  useLazyRefreshQuery
} = sessionAPI
