import {api} from "../../../../shared/services/api";
import {baseEntitiesState} from "../../../../shared/utils/reducer-handlers.ts";
import {IType} from "../../model/type-model.ts";
import {ParamsType} from "../../../../shared/models";


export const typeAPI = api.injectEndpoints({
  endpoints: (build) => ({
    loadTypes: build.query<baseEntitiesState & {list:IType[]}, { params?:ParamsType }>({
      query: ({params}) => ({
        url: `/api/types`,
        params
      }),
      providesTags: () => ['Type']
    }),
  })
})

export const {
  useLoadTypesQuery
} = typeAPI