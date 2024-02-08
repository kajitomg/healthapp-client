import {api} from "../../../../shared/services/api";
import {IUser} from "../../model/user-model.ts";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";


export const sessionAPI = api.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation<baseEntitiesState & {user:IUser,accessToken:string}, {email:string,password:string}>({
      query: (data:{email:string,password:string}) => ({
        url: `/api/users/signin`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Session']
    }),
    signout: build.mutation<IUser, void>({
      query: () => ({
        url: `/api/users/signout`,
        method: 'POST'
      }),
      invalidatesTags: ['Session']
    }),
    refresh: build.query<baseEntitiesState & {user:IUser,accessToken:string}, void>({
      query: () => ({
        url: `/api/users/refresh`,
      }),
      providesTags: () => ['Session']
    }),
  })
})

export const {
  useSignoutMutation,
  useSigninMutation,
  useRefreshQuery
} = sessionAPI
