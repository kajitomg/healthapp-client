import {api} from "../../../../shared/services/api";
import {IUser} from "../../model/user-model.ts";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";


export const userAPI = api.injectEndpoints({
  endpoints: (build) => ({
    loadUsers: build.query<baseEntitiesState & {list:IUser[]}, number>({
      query: (limit: number = 5) => ({
        url: `/api/users`,
        params: {
          limit: limit
        }
      }),
      providesTags: () => ['User']
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/api/users`,
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    }),
    updateUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/api/users/${user.id}`,
        method: 'PUT',
        body: user
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
