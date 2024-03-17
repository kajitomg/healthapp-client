import {api} from "../../../../shared/services/api";
import {IUser} from "../../model/user-model.ts";
import {ApiOptions} from "../../../../shared/services/api/model.ts";


export const userAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/api/users`,
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    }),
    updateUser: build.mutation<{item:IUser}, { userId:number,data?:{phonenumber?:string,name?:string},options?:ApiOptions }>({
      query: ({data,userId,options}) => ({
        url: `/api/users/${userId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    
    updateUserPassword: build.mutation<{item:IUser}, { userId:number,data?:{password?:string,currentPassword?:string},options?:ApiOptions }>({
      query: ({data,userId,options}) => ({
        url: `/api/users/password/${userId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    
    updateUserEmail: build.mutation<{item:IUser}, { userId:number,data?:{email?:string},options?:ApiOptions }>({
      query: ({data,userId,options}) => ({
        url: `/api/users/email/${userId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/api/users/${user.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User']
    }),
  })
})

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useUpdateUserEmailMutation,
  useDeleteUserMutation
} = userAPI
